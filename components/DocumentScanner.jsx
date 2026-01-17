'use client';

import { useState, useRef } from 'react';
import { Box, Button, Typography, Paper, LinearProgress, Alert, Chip, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import { createWorker } from 'tesseract.js';

// Pattern matchers for different ID types
const ID_PATTERNS = {
    'Aadhar Card': {
        regex: /\b\d{4}\s?\d{4}\s?\d{4}\b/,
        format: (match) => match.replace(/\s/g, ''),
        validate: (num) => /^\d{12}$/.test(num)
    },
    'Voter ID': {
        regex: /\b[A-Z]{3}\d{7}\b/i,
        format: (match) => match.toUpperCase(),
        validate: (num) => /^[A-Z]{3}\d{7}$/.test(num)
    },
    'Ration Card': {
        regex: /\b[A-Z0-9]{10,15}\b/i,
        format: (match) => match.toUpperCase(),
        validate: (num) => /^[A-Z0-9]{10,15}$/.test(num)
    },
    'Property Tax Receipt': {
        regex: /\b[A-Z0-9\-]{8,20}\b/i,
        format: (match) => match.toUpperCase(),
        validate: (num) => /^[A-Z0-9\-]{8,20}$/.test(num)
    },
    'Electricity Bill': {
        regex: /\b\d{10,15}\b/,
        format: (match) => match,
        validate: (num) => /^\d{10,15}$/.test(num)
    }
};

// Extract name from text (common patterns in Indian IDs)
const extractName = (text) => {
    // Look for common name patterns
    const lines = text.split('\n');

    // Look for lines after keywords like "Name", "नाम", etc.
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/name|नाम|नाव/i.test(line)) {
            // Next line might be the name
            if (i + 1 < lines.length) {
                const nextLine = lines[i + 1].trim();
                // Filter out lines that are likely not names
                if (nextLine.length > 2 && nextLine.length < 50 && /^[a-zA-Z\s]+$/.test(nextLine)) {
                    return nextLine;
                }
            }
            // Or name might be on same line after colon
            const colonMatch = line.match(/[:]\s*([a-zA-Z\s]{3,50})/);
            if (colonMatch) {
                return colonMatch[1].trim();
            }
        }
    }

    // Fallback: look for capitalized words (potential names)
    for (const line of lines) {
        const words = line.trim().split(/\s+/);
        if (words.length >= 2 && words.length <= 4) {
            const allCapitalized = words.every(w => /^[A-Z][a-z]+$/.test(w));
            if (allCapitalized) {
                return words.join(' ');
            }
        }
    }

    return '';
};

export default function DocumentScanner({
    idType = 'Aadhar Card',
    onDataExtracted,
    compact = false
}) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [extractedData, setExtractedData] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (JPG, PNG, etc.)');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        setError('');
        setImage(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);

        // Auto-process
        processDocument(file);
    };

    const processDocument = async (file) => {
        setProcessing(true);
        setProgress(0);
        setError('');

        try {
            const worker = await createWorker('eng', 1, {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 100));
                    }
                }
            });

            const { data: { text } } = await worker.recognize(file);
            await worker.terminate();

            // Extract ID number based on type
            const pattern = ID_PATTERNS[idType];
            let idNumber = '';

            if (pattern) {
                const match = text.match(pattern.regex);
                if (match) {
                    idNumber = pattern.format(match[0]);
                    if (!pattern.validate(idNumber)) {
                        idNumber = ''; // Invalid format
                    }
                }
            }

            // Extract name
            const name = extractName(text);

            const extracted = {
                fullText: text,
                idNumber,
                name,
                idType,
                confidence: idNumber && name ? 'high' : (idNumber || name) ? 'medium' : 'low',
                timestamp: new Date().toISOString()
            };

            setExtractedData(extracted);
            setProgress(100);

            if (onDataExtracted) {
                onDataExtracted(extracted);
            }

            if (!idNumber && !name) {
                setError('Could not extract ID details. Please check image quality or enter manually.');
            }

        } catch (err) {
            console.error('OCR Error:', err);
            setError('Failed to process document. Please try again or enter details manually.');
        } finally {
            setProcessing(false);
        }
    };

    const handleReset = () => {
        setImage(null);
        setPreview(null);
        setExtractedData(null);
        setProgress(0);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (compact && extractedData) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                    icon={<CheckCircleIcon />}
                    label="Document Scanned"
                    color="success"
                    size="small"
                />
                {extractedData.name && (
                    <Chip label={`Name: ${extractedData.name}`} size="small" variant="outlined" />
                )}
                {extractedData.idNumber && (
                    <Chip label={`ID: ${extractedData.idNumber}`} size="small" variant="outlined" />
                )}
                <IconButton size="small" onClick={handleReset}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>
        );
    }

    return (
        <Paper elevation={2} sx={{ p: 2, bgcolor: '#f9f9f9', border: '1px dashed #ccc' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <DescriptionIcon sx={{ color: '#1a4e8e' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                    Document Scanner / दस्तावेज़ स्कैनर
                </Typography>
            </Box>

            {!preview && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                            borderRadius: 0,
                            borderColor: '#1a4e8e',
                            color: '#1a4e8e',
                            '&:hover': { bgcolor: '#1a4e8e', color: '#fff' }
                        }}
                    >
                        Upload {idType} / अपलोड करें
                    </Button>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#666' }}>
                        JPG, PNG • Max 10MB • Clear, well-lit photo
                    </Typography>
                </Box>
            )}

            {preview && (
                <Box>
                    <Box sx={{
                        position: 'relative',
                        maxWidth: '100%',
                        mb: 2,
                        border: '2px solid #ddd',
                        borderRadius: 1,
                        overflow: 'hidden'
                    }}>
                        <img
                            src={preview}
                            alt="Document preview"
                            style={{
                                width: '100%',
                                maxHeight: '300px',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                        />
                        {!processing && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    bgcolor: 'rgba(255,255,255,0.9)',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                                }}
                                onClick={handleReset}
                                size="small"
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>

                    {processing && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                                Processing document... {progress}%
                            </Typography>
                            <LinearProgress variant="determinate" value={progress} />
                        </Box>
                    )}

                    {extractedData && !processing && (
                        <Box>
                            <Alert
                                severity={extractedData.confidence === 'high' ? 'success' : 'warning'}
                                sx={{ mb: 2, borderRadius: 0 }}
                            >
                                {extractedData.confidence === 'high'
                                    ? '✓ Document processed successfully!'
                                    : '⚠ Partial data extracted. Please verify.'}
                            </Alert>

                            <Box sx={{ bgcolor: '#fff', p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                                {extractedData.name && (
                                    <Box sx={{ mb: 1 }}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                            Extracted Name:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            {extractedData.name}
                                        </Typography>
                                    </Box>
                                )}
                                {extractedData.idNumber && (
                                    <Box sx={{ mb: 1 }}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                            Extracted ID Number:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                                            {extractedData.idNumber}
                                        </Typography>
                                    </Box>
                                )}
                                {!extractedData.name && !extractedData.idNumber && (
                                    <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                                        No data extracted. Please enter manually.
                                    </Typography>
                                )}
                            </Box>

                            <Button
                                fullWidth
                                variant="text"
                                size="small"
                                onClick={handleReset}
                                sx={{ mt: 1 }}
                            >
                                Upload Different Document
                            </Button>
                        </Box>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mt: 2, borderRadius: 0 }}>
                            {error}
                        </Alert>
                    )}
                </Box>
            )}
        </Paper>
    );
}
