'use client';

import { Container, Typography, Paper, Box, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ServicesPage() {
    const services = [
        {
            title: 'Grievance Redressal',
            icon: '📝',
            desc: 'File complaints online and track their status in real-time. Get notifications on resolution progress.',
            link: '/dashboard',
        },
        {
            title: 'Water & Drainage',
            icon: '💧',
            desc: 'Report water supply issues, pipeline leakage, sewer overflow. Check daily water availability.',
            link: '#',
        },
        {
            title: 'Sanitation Services',
            icon: '🧹',
            desc: 'Track garbage collection, report missed pickups, check Swachh Bharat compliance status.',
            link: '#',
        },
        {
            title: 'Roads & Transport',
            icon: '🛣️',
            desc: 'Report potholes, check road repair schedules, view traffic signal status.',
            link: '#',
        },
        {
            title: 'Street Lighting',
            icon: '💡',
            desc: 'Report non-functional lights, check maintenance schedules, view power outage updates.',
            link: '#',
        },
        {
            title: 'Health Services',
            icon: '🏥',
            desc: 'Find nearby hospitals, check ambulance availability, view Air Quality Index.',
            link: '#',
        },
        {
            title: 'Property Tax',
            icon: '🏠',
            desc: 'Pay property tax online, download receipts, check assessment details.',
            link: '#',
        },
        {
            title: 'Building Permissions',
            icon: '🏗️',
            desc: 'Apply for building permits, track application status, download approvals.',
            link: '#',
        },
        {
            title: 'Birth/Death Certificates',
            icon: '📜',
            desc: 'Apply for birth and death certificates online. Download certified copies.',
            link: '#',
        },
        {
            title: 'Trade License',
            icon: '🏪',
            desc: 'Apply for new trade license, renew existing licenses, pay fees online.',
            link: '#',
        },
        {
            title: 'Water Tax Payment',
            icon: '💳',
            desc: 'Pay water bills online, view consumption history, download payment receipts.',
            link: '#',
        },
        {
            title: 'Public Safety',
            icon: '🛡️',
            desc: 'View CCTV coverage, report safety concerns, check disaster preparedness status.',
            link: '#',
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Page Header */}
            <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #138808 0%, #0e6606 100%)', color: '#fff' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Our Services</Typography>
                <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>हमारी सेवाएं</Typography>
            </Paper>

            {/* Services Grid */}
            <Grid container spacing={3}>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.2s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h3" sx={{ mr: 2 }}>{service.icon}</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000080' }}>{service.title}</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {service.desc}
                                </Typography>
                                <Button
                                    component={Link}
                                    href={service.link}
                                    size="small"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ color: '#FF9933' }}
                                >
                                    Access Service
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Helpline Section */}
            <Paper sx={{ p: 4, mt: 4, bgcolor: '#fff3e0' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#e65100', mb: 2 }}>
                    Need Help?
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>📞 Toll Free Helpline</Typography>
                        <Typography variant="h5" sx={{ color: '#000080' }}>1800-XXX-XXXX</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>📧 Email Support</Typography>
                        <Typography variant="body1" sx={{ color: '#000080' }}>helpdesk@majaumred.gov.in</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>⏰ Support Hours</Typography>
                        <Typography variant="body1">Mon - Sat: 9:00 AM - 6:00 PM</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
