'use client';

import { Container, Typography, Paper, Box, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function AboutPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Page Header */}
            <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #1a4e8e 0%, #0d3a6e 100%)', color: '#fff' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>About Maja Umred</Typography>
                <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>माजा उमरेड के बारे में</Typography>
            </Paper>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {/* Overview */}
                    <Paper sx={{ p: 4, mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000080', mb: 2, borderBottom: '3px solid #FF9933', pb: 1 }}>
                            Overview
                        </Typography>
                        <Typography paragraph>
                            <strong>Maja Umred</strong> is a National E-Governance Platform developed under the Smart Cities Mission and Digital India Programme.
                            It provides real-time ward-wise performance dashboards for civic services across Umred, Maharashtra.
                        </Typography>
                        <Typography paragraph>
                            The platform transforms traditional complaint-based governance into a performance-based accountability system,
                            empowering citizens with transparent access to service delivery metrics.
                        </Typography>
                    </Paper>

                    {/* Vision & Mission */}
                    <Paper sx={{ p: 4, mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000080', mb: 2, borderBottom: '3px solid #FF9933', pb: 1 }}>
                            Vision & Mission
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ color: '#138808', fontWeight: 'bold' }}>Our Vision</Typography>
                            <Typography>
                                To establish Umred as a model city for transparent, citizen-centric, and data-driven governance in India.
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ color: '#138808', fontWeight: 'bold' }}>Our Mission</Typography>
                            <List dense>
                                {[
                                    'Provide real-time monitoring of civic services at ward level',
                                    'Ensure daily-updated public accountability system',
                                    'Enable data-driven governance for citizens and administrators',
                                    'Deliver AI-powered predictive analytics for service improvement',
                                    'Offer multi-language support for inclusive access',
                                ].map((item, i) => (
                                    <ListItem key={i}>
                                        <ListItemIcon sx={{ minWidth: 35 }}><CheckCircleIcon color="success" fontSize="small" /></ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Paper>

                    {/* Location */}
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000080', mb: 2, borderBottom: '3px solid #FF9933', pb: 1 }}>
                            About Umred
                        </Typography>
                        <Typography paragraph>
                            <strong>Umred</strong> is a city and a municipal council in Nagpur district in the state of Maharashtra, India.
                            Located approximately 50 km from Nagpur, it is known for its proximity to the Umred Karhandla Wildlife Sanctuary,
                            home to wild tigers.
                        </Typography>
                        <Typography paragraph>
                            <strong>District:</strong> Nagpur<br />
                            <strong>State:</strong> Maharashtra<br />
                            <strong>Country:</strong> India<br />
                            <strong>PIN Code:</strong> 441203
                        </Typography>
                    </Paper>
                </Grid>

                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000080', mb: 2 }}>
                            Government Alignment
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List dense>
                            {[
                                'Smart Cities Mission',
                                'Swachh Bharat Abhiyan',
                                'AMRUT Mission',
                                'Digital India Programme',
                                'National e-Governance Plan',
                            ].map((item, i) => (
                                <ListItem key={i} sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon color="primary" fontSize="small" /></ListItemIcon>
                                    <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.9rem' }} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    <Paper sx={{ p: 3, mt: 3, bgcolor: '#fff3e0' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e65100', mb: 2 }}>
                            Key Statistics
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body2" paragraph><strong>Total Wards:</strong> 8</Typography>
                        <Typography variant="body2" paragraph><strong>Population:</strong> ~50,000</Typography>
                        <Typography variant="body2" paragraph><strong>Since:</strong> 2024</Typography>
                        <Typography variant="body2"><strong>Civic Domains:</strong> 8 Service Areas</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
