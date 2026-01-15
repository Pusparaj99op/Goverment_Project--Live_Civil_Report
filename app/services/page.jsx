'use client';

import { Container, Typography, Paper, Box, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DescriptionIcon from '@mui/icons-material/Description';

export default function ServicesPage() {
    const services = [
        {
            title: 'Grievance Redressal',
            titleHi: 'तक्रार निवारण',
            icon: '📝',
            desc: 'File complaints online and track their status in real-time. Get notifications on resolution progress.',
            link: '/dashboard',
            color: '#1a4e8e'
        },
        {
            title: 'Water & Drainage',
            titleHi: 'पाणी व निचरा',
            icon: '💧',
            desc: 'Report water supply issues, pipeline leakage, sewer overflow. Check daily water availability.',
            link: '/under-construction',
            color: '#0288d1'
        },
        {
            title: 'Sanitation Services',
            titleHi: 'स्वच्छता सेवा',
            icon: '🧹',
            desc: 'Track garbage collection, report missed pickups, check Swachh Bharat compliance status.',
            link: '/under-construction',
            color: '#388e3c'
        },
        {
            title: 'Roads & Transport',
            titleHi: 'रस्ते व वाहतूक',
            icon: '🛣️',
            desc: 'Report potholes, check road repair schedules, view traffic signal status.',
            link: '/under-construction',
            color: '#FF9933'
        },
        {
            title: 'Street Lighting',
            titleHi: 'रस्त्यावरील दिवे',
            icon: '💡',
            desc: 'Report non-functional lights, check maintenance schedules, view power outage updates.',
            link: '/under-construction',
            color: '#f9a825'
        },
        {
            title: 'Health Services',
            titleHi: 'आरोग्य सेवा',
            icon: '🏥',
            desc: 'Find nearby hospitals, check ambulance availability, view Air Quality Index.',
            link: '/under-construction',
            color: '#d32f2f'
        },
        {
            title: 'Property Tax',
            titleHi: 'मालमत्ता कर',
            icon: '🏠',
            desc: 'Pay property tax online, download receipts, check assessment details.',
            link: '/under-construction',
            color: '#7b1fa2'
        },
        {
            title: 'Building Permissions',
            titleHi: 'बांधकाम परवानगी',
            icon: '🏗️',
            desc: 'Apply for building permits, track application status, download approvals.',
            link: '/under-construction',
            color: '#455a64'
        },
        {
            title: 'Birth/Death Certificates',
            titleHi: 'जन्म/मृत्यू प्रमाणपत्र',
            icon: '📜',
            desc: 'Apply for birth and death certificates online. Download certified copies.',
            link: '/under-construction',
            color: '#5d4037'
        },
        {
            title: 'Trade License',
            titleHi: 'व्यापार परवाना',
            icon: '🏪',
            desc: 'Apply for new trade license, renew existing licenses, pay fees online.',
            link: '/under-construction',
            color: '#00695c'
        },
        {
            title: 'Water Tax Payment',
            titleHi: 'पाणी कर भरणा',
            icon: '💳',
            desc: 'Pay water bills online, view consumption history, download payment receipts.',
            link: '/under-construction',
            color: '#1565c0'
        },
        {
            title: 'Public Safety',
            titleHi: 'सार्वजनिक सुरक्षा',
            icon: '🛡️',
            desc: 'View CCTV coverage, report safety concerns, check disaster preparedness status.',
            link: '/under-construction',
            color: '#b71c1c'
        },
    ];

    const quickLinks = [
        { text: 'File a Complaint', href: '/dashboard', icon: '📝' },
        { text: 'Track Application', href: '/dashboard', icon: '🔍' },
        { text: 'Pay Bills Online', href: '/under-construction', icon: '💳' },
        { text: 'Download Forms', href: '/under-construction', icon: '📥' },
        { text: 'RTI Application', href: '/under-construction', icon: '📋' },
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #138808 0%, #0a5c04 100%)',
                color: '#fff',
                py: { xs: 4, md: 6 },
                borderBottom: '4px solid #FF9933',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Pattern */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.05,
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }} />

                <Container maxWidth="xl">
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <img src="/emblem_new.png" alt="Government Emblem" style={{ height: 60, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} />
                            <Box>
                                <Typography variant="caption" sx={{ color: '#FF9933', fontWeight: 'bold', letterSpacing: 1 }}>
                                    UMRED NAGAR PARISHAD
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
                                    उमरेड नगरपरिषद | District Nagpur
                                </Typography>
                            </Box>
                        </Box>

                        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' }, fontFamily: 'Merriweather, serif' }}>
                            Our Services
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#FF9933', mb: 2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                            नागरिक सेवा | Citizen Services
                        </Typography>

                        <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 1, borderLeft: '4px solid #FF9933', maxWidth: 700 }}>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                Access all municipal services online. From filing grievances to paying taxes,
                                all services are available 24x7 for citizens of Umred.
                            </Typography>
                        </Box>

                        {/* Tricolor Bar */}
                        <Box sx={{ display: 'flex', mt: 3, gap: 0 }}>
                            <Box sx={{ width: 60, height: 6, bgcolor: '#FF9933', borderRadius: '3px 0 0 3px' }} />
                            <Box sx={{ width: 60, height: 6, bgcolor: '#fff' }} />
                            <Box sx={{ width: 60, height: 6, bgcolor: '#138808', borderRadius: '0 3px 3px 0' }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {/* Left Sidebar - Quick Links */}
                    <Grid item xs={12} md={3}>
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd', position: 'sticky', top: 20 }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, borderLeft: '5px solid #FF9933' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>⚡ Quick Access</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {quickLinks.map((link, i) => (
                                    <ListItem
                                        key={i}
                                        component={Link}
                                        href={link.href}
                                        sx={{
                                            color: '#333',
                                            borderBottom: '1px solid #eee',
                                            py: 1.5,
                                            '&:hover': { bgcolor: '#e8f4fc', pl: 2.5, color: '#1a4e8e' },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 32, fontSize: '1.2rem' }}>{link.icon}</ListItemIcon>
                                        <ListItemText primary={link.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
                                        <ArrowRightIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Service Guidelines */}
                        <Paper sx={{ mt: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#FF9933', color: '#000', p: 2, borderLeft: '5px solid #138808' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>📋 Guidelines</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                {[
                                    'Keep Aadhaar/ID ready for verification',
                                    'All applications are processed within 7 working days',
                                    'Track status using Application ID',
                                    'For urgent matters, contact helpline'
                                ].map((item, i) => (
                                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                                        <CheckCircleIcon sx={{ color: '#138808', fontSize: 18, mt: 0.2 }} />
                                        <Typography variant="body2" sx={{ color: '#555' }}>{item}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Main Content - Services Grid */}
                    <Grid item xs={12} md={9}>
                        <Paper sx={{ mb: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DescriptionIcon />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>All Municipal Services</Typography>
                                <Typography variant="caption" sx={{ ml: 'auto', opacity: 0.8 }}>{services.length} Services Available</Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Grid container spacing={3}>
                                    {services.map((service, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Card sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: '0.2s',
                                                borderRadius: 0,
                                                border: '1px solid #eee',
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: 6,
                                                    borderColor: service.color
                                                }
                                            }}>
                                                <Box sx={{ bgcolor: service.color, height: 4 }} />
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <Typography variant="h3" sx={{ mr: 2 }}>{service.icon}</Typography>
                                                        <Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#000080', lineHeight: 1.2 }}>
                                                                {service.title}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ color: '#666' }}>
                                                                {service.titleHi}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '0.85rem' }}>
                                                        {service.desc}
                                                    </Typography>
                                                    <Button
                                                        component={Link}
                                                        href={service.link}
                                                        size="small"
                                                        endIcon={<ArrowForwardIcon />}
                                                        sx={{
                                                            color: service.color,
                                                            fontWeight: 'bold',
                                                            '&:hover': { bgcolor: `${service.color}10` }
                                                        }}
                                                    >
                                                        Access Service
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Helpline Section */}
            <Box sx={{ bgcolor: '#1a4e8e', py: 4 }}>
                <Container maxWidth="xl">
                    <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 0, boxShadow: 5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <SupportAgentIcon sx={{ fontSize: 40, color: '#FF9933' }} />
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>
                                    Need Help? Contact Our Helpdesk
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    मदत हवी आहे? आमच्या हेल्पडेस्कशी संपर्क साधा
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e8f4fc', borderRadius: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1a4e8e', mb: 1 }}>📞 Toll Free Helpline</Typography>
                                    <Typography variant="h4" sx={{ color: '#000080', fontWeight: 'bold' }}>1800-XXX-XXXX</Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>24x7 Available</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#fff8e1', borderRadius: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#e65100', mb: 1 }}>📧 Email Support</Typography>
                                    <Typography variant="h6" sx={{ color: '#000080' }}>helpdesk@umrednp.gov.in</Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>Response within 24 hours</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#388e3c', mb: 1 }}>⏰ Office Hours</Typography>
                                    <Typography variant="h6" sx={{ color: '#000080' }}>Mon - Sat</Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>10:00 AM - 5:00 PM</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </div>
    );
}
