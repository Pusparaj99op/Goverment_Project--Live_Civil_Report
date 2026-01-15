'use client';

import { Container, Typography, Box, Button, Paper, Divider } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningIcon from '@mui/icons-material/Warning';

export default function UnderConstruction() {
    return (
        <Box sx={{
            minHeight: '70vh',
            py: 6,
            bgcolor: '#f9f9f9'
        }}>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd' }}>
                    {/* Header Strip */}
                    <Box sx={{ bgcolor: '#FF9933', py: 2, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                            सूचना / NOTICE
                        </Typography>
                    </Box>

                    <Box sx={{ p: { xs: 3, md: 6 }, textAlign: 'center' }}>
                        {/* Emblem Placeholder (if needed, otherwise just text) */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000080', mb: 1 }}>
                                उमरेड नगर परिषद
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#555', fontWeight: 'bold' }}>
                                UMRED MUNICIPAL COUNCIL
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Icon */}
                        <WarningIcon sx={{ fontSize: 80, color: '#e65100', mb: 2 }} />

                        {/* Message */}
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                            हे पृष्ठ निर्माणाधीन आहे
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#666', mb: 4 }}>
                            This Page is Under Construction
                        </Typography>

                        <Typography variant="body1" sx={{ color: '#555', mb: 4, lineHeight: 1.8, maxWidth: '600px', mx: 'auto' }}>
                            नागरिकांना कळविण्यात येते की निवडलेले वेब पृष्ठ अद्याप तयार होत आहे. असुविधेबद्दल क्षमस्व. कृपया इतर उपलब्ध सेवांचा लाभ घ्या.
                            <br />
                            <br />
                            Citizens are informed that the selected web page is still under development. We regret the inconvenience. Please avail other available services.
                        </Typography>

                        {/* Official Links */}
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                component={Link}
                                href="/"
                                startIcon={<HomeIcon />}
                                sx={{
                                    bgcolor: '#1a4e8e',
                                    '&:hover': { bgcolor: '#0d3a6e' },
                                    px: 4, py: 1.5,
                                    borderRadius: 0,
                                    fontWeight: 'bold'
                                }}
                            >
                                मुखपृष्ठ (HOME)
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => window.history.back()}
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    color: '#b71c1c',
                                    borderColor: '#b71c1c',
                                    '&:hover': { bgcolor: '#ffebee', borderColor: '#b71c1c' },
                                    px: 4, py: 1.5,
                                    borderRadius: 0,
                                    fontWeight: 'bold'
                                }}
                            >
                                मागे (BACK)
                            </Button>
                        </Box>
                    </Box>

                    {/* Footer Strip */}
                    <Box sx={{ bgcolor: '#138808', py: 1, px: 3 }}>
                        <Typography variant="caption" sx={{ color: '#fff', display: 'block', textAlign: 'center' }}>
                            © Umred Municipal Council. All Rights Reserved.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
