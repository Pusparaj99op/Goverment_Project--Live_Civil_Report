'use client';

import { useState } from 'react';
import { Container, Typography, Paper, Box, Grid, TextField, Button, Alert, Card, CardContent, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        { icon: <LocationOnIcon sx={{ fontSize: 40, color: '#FF9933' }} />, title: 'Address', content: 'Umred Municipal Council,\nUmred, Dist. Nagpur - 441203,\nMaharashtra, India.' },
        { icon: <PhoneIcon sx={{ fontSize: 40, color: '#138808' }} />, title: 'Phone', content: 'Toll Free: 1800-XXX-XXXX\nOffice: +91-7116-XXXXXX' },
        { icon: <EmailIcon sx={{ fontSize: 40, color: '#000080' }} />, title: 'Email', content: 'contact@majaumred.gov.in\nhelpdesk@majaumred.gov.in' },
        { icon: <AccessTimeIcon sx={{ fontSize: 40, color: '#b71c1c' }} />, title: 'Office Hours', content: 'Monday - Friday: 10:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Page Header */}
            <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #FF9933 0%, #e68a00 100%)', color: '#000' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Contact Us</Typography>
                <Typography variant="h6" sx={{ mt: 1, opacity: 0.8 }}>संपर्क करें</Typography>
            </Paper>

            <Grid container spacing={4}>
                {/* Contact Form */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000080', mb: 3, borderBottom: '3px solid #FF9933', pb: 1 }}>
                            Send us a Message
                        </Typography>

                        {submitted && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Thank you for your message! We will get back to you within 2-3 working days.
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="email"
                                        label="Email Address"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Your Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ bgcolor: '#000080', '&:hover': { bgcolor: '#000060' } }}
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* Contact Info Cards */}
                <Grid item xs={12} md={5}>
                    <Grid container spacing={2}>
                        {contactInfo.map((info, index) => (
                            <Grid item xs={12} key={index}>
                                <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                    <Box sx={{ mr: 2 }}>{info.icon}</Box>
                                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{info.title}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                                            {info.content}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Important Links */}
                    <Paper sx={{ p: 3, mt: 3, bgcolor: '#e3f2fd' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000080', mb: 2 }}>
                            Important Links
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body2" paragraph>
                            🔗 <a href="https://www.india.gov.in" target="_blank" rel="noopener" style={{ color: '#000080' }}>National Portal of India</a>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            🔗 <a href="https://maharashtra.gov.in" target="_blank" rel="noopener" style={{ color: '#000080' }}>Maharashtra Government</a>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            🔗 <a href="https://nagpur.nic.in" target="_blank" rel="noopener" style={{ color: '#000080' }}>District Nagpur</a>
                        </Typography>
                        <Typography variant="body2">
                            🔗 <a href="https://digitalindia.gov.in" target="_blank" rel="noopener" style={{ color: '#000080' }}>Digital India</a>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Map Placeholder */}
            <Paper sx={{ p: 0, mt: 4, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: '#e0e0e0', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <LocationOnIcon sx={{ fontSize: 60, color: '#666' }} />
                        <Typography variant="h6" color="text.secondary">
                            Umred Municipal Council
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Umred, Nagpur District, Maharashtra 441203
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
