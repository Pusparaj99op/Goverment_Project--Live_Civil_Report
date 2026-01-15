'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Paper, TextField, Button, Typography, Box, Alert, MenuItem } from '@mui/material';
import Link from 'next/link';

// Dynamic API URL - uses relative path when accessed via tunnel, localhost when local
const getApiBaseUrl = () => {
    if (typeof window === 'undefined') return 'http://localhost:5000';
    const hostname = window.location.hostname;
    // If accessing via tunnel (not localhost), use the tunnel URL with port 5000 tunnel
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        // For external access, we need to proxy through the same origin
        return window.location.origin;
    }
    return 'http://localhost:5000';
};

const WARDS = Array.from({ length: 13 }, (_, i) => `Ward ${i + 1}`);

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        ward: 'Ward 1',
        idProofType: 'Ration Card',
        idProofNumber: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${getApiBaseUrl()}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                window.location.href = '/dashboard';
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url("/images/karandla.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                py: 4,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 50% white overlay
                    zIndex: 1,
                }
            }}
        >
            <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
                <Paper
                    elevation={6}
                    sx={{
                        p: { xs: 2, md: 4 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 0,
                        borderTop: '6px solid #FF9933',
                        borderBottom: '6px solid #138808'
                    }}
                >
                    <Box sx={{ mb: 2 }}>
                        <img src="/emblem.png" alt="Emblem" style={{ height: 60 }} />
                    </Box>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Citizen Registration
                    </Typography>

                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                            InputProps={{ sx: { borderRadius: 0 } }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            InputProps={{ sx: { borderRadius: 0 } }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            select
                            name="ward"
                            label="Select Ward"
                            value={formData.ward}
                            onChange={handleChange}
                            InputProps={{ sx: { borderRadius: 0 } }}
                        >
                            {WARDS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            select
                            name="idProofType"
                            label="ID Proof Type"
                            value={formData.idProofType}
                            onChange={handleChange}
                            InputProps={{ sx: { borderRadius: 0 } }}
                        >
                            <MenuItem value="Ration Card">Ration Card</MenuItem>
                            <MenuItem value="Electricity Bill">Electricity Bill</MenuItem>
                            <MenuItem value="Property Tax Receipt">Property Tax Receipt</MenuItem>
                            <MenuItem value="Aadhar Card">Aadhar Card</MenuItem>
                        </TextField>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="idProofNumber"
                            label="ID Proof Number"
                            name="idProofNumber"
                            value={formData.idProofNumber}
                            onChange={handleChange}
                            InputProps={{ sx: { borderRadius: 0 } }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{ sx: { borderRadius: 0 } }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                backgroundColor: '#FF9933',
                                borderRadius: 0,
                                fontWeight: 'bold',
                                color: '#000',
                                '&:hover': { backgroundColor: '#e68a00' }
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link href="/auth/login" style={{ color: '#000080', textDecoration: 'none' }}>
                                {"Already have an account? Sign In"}
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
