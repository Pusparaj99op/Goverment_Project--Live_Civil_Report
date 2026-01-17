const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const Document = require('../models/Document');
const { protect: auth } = require('../middleware/auth');

// Configure multer for file uploads (optional - for storing document images)
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads/documents');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
        } catch (err) {
            console.error('Error creating upload directory:', err);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'doc-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files and PDFs are allowed'));
        }
    }
});

// ID validation utilities
const validateAadhar = (number) => {
    // Basic Aadhar validation: 12 digits
    if (!/^\d{12}$/.test(number)) return false;

    // Verhoeff algorithm check (simplified)
    // In production, implement full Verhoeff algorithm
    return true;
};

const validateVoterID = (number) => {
    // Format: 3 letters + 7 digits
    return /^[A-Z]{3}\d{7}$/.test(number);
};

const validateRationCard = (number) => {
    // Varies by state, basic check for alphanumeric 10-15 chars
    return /^[A-Z0-9]{10,15}$/.test(number);
};

const validatePropertyTaxReceipt = (number) => {
    // Alphanumeric with optional dashes
    return /^[A-Z0-9\-]{8,20}$/.test(number);
};

const validateElectricityBill = (number) => {
    // Usually 10-15 digits
    return /^\d{10,15}$/.test(number);
};

const validators = {
    'Aadhar Card': validateAadhar,
    'Voter ID': validateVoterID,
    'Ration Card': validateRationCard,
    'Property Tax Receipt': validatePropertyTaxReceipt,
    'Electricity Bill': validateElectricityBill
};

// @route   POST /api/documents/validate
// @desc    Validate ID number format
// @access  Public
router.post('/validate', async (req, res) => {
    try {
        const { documentType, documentNumber } = req.body;

        if (!documentType || !documentNumber) {
            return res.status(400).json({
                valid: false,
                message: 'Document type and number are required'
            });
        }

        const validator = validators[documentType];

        if (!validator) {
            return res.status(400).json({
                valid: false,
                message: 'Invalid document type'
            });
        }

        const isValid = validator(documentNumber);

        res.json({
            valid: isValid,
            message: isValid
                ? 'Document number format is valid'
                : 'Invalid document number format',
            documentType,
            documentNumber
        });
    } catch (error) {
        res.status(500).json({
            valid: false,
            message: error.message
        });
    }
});

// @route   POST /api/documents/upload
// @desc    Upload and store document (optional)
// @access  Private
router.post('/upload', auth, upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { documentType, documentNumber, extractedData } = req.body;

        // Parse extractedData if it's a string
        let parsedExtractedData = extractedData;
        if (typeof extractedData === 'string') {
            try {
                parsedExtractedData = JSON.parse(extractedData);
            } catch (e) {
                parsedExtractedData = { fullText: extractedData };
            }
        }

        const document = await Document.create({
            user: req.user._id,
            documentType,
            documentNumber,
            extractedData: parsedExtractedData,
            filePath: req.file.path
        });

        res.status(201).json({
            message: 'Document uploaded successfully',
            document: {
                id: document._id,
                documentType: document.documentType,
                documentNumber: document.documentNumber,
                uploadedAt: document.uploadedAt
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/documents
// @desc    Get user's documents
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const documents = await Document.find({ user: req.user._id })
            .sort({ uploadedAt: -1 })
            .select('-filePath'); // Don't send file paths to client

        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/documents/:id
// @desc    Get specific document
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/documents/:id
// @desc    Delete document
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Delete file if exists
        if (document.filePath) {
            try {
                await fs.unlink(document.filePath);
            } catch (err) {
                console.error('Error deleting file:', err);
            }
        }

        await document.deleteOne();

        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
