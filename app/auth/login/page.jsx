'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
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

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                router.push('/dashboard');
                // Force reload to update navbar state if needed, or rely on context (for now simple reload or event listener is tricky in simple impl, we'll let Navbar check on mount/update)
                window.location.href = '/dashboard';
            } else {
                setError(data.message || 'Login failed');
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
            <Container component="main" maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: 450,
                        mx: 'auto'
                    }}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            p: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            borderRadius: 0, // Boxy style
                            overflow: 'hidden',
                            borderTop: '6px solid #FF9933', // Saffron
                            borderBottom: '6px solid #138808', // Green
                            backgroundImage: 'linear-gradient(to bottom, #fff, #f9f9f9)'
                        }}
                    >
                        <Box sx={{ width: '100%', p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <img
                                src="/emblem.png"
                                alt="National Emblem"
                                style={{ height: '70px', width: 'auto', objectFit: 'contain', marginBottom: '16px' }}
                            />

                            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#000', textAlign: 'center' }}>
                                Citizen Login
                            </Typography>
                            <Typography component="h2" variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#555', textAlign: 'center' }}>
                                नागरिक लॉगिन
                            </Typography>

                            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address / ईमेल पत्ता"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        style: { borderRadius: 0 } // Boxy inputs
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password / पासवर्ड"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        style: { borderRadius: 0 } // Boxy inputs
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        bgcolor: '#FF9933', // Saffron
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        borderRadius: 0, // Boxy button
                                        '&:hover': {
                                            bgcolor: '#e68a00',
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Sign In / साइन इन करा'}
                                </Button>
                                <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <Link href="/auth/register" style={{ color: '#000080', textDecoration: 'none', fontWeight: '500' }}>
                                        {"Don't have an account? Register / नोंदणी करा"}
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', textShadow: '0px 1px 2px rgba(255,255,255,0.8)' }}>
                            Government of Maharashtra | महाराष्ट्र शासन
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
