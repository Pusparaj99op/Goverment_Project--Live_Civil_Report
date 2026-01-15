'use client';

import { Container, Grid, Typography, Paper, Button, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Card, CardMedia, CardContent } from '@mui/material';
import Link from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DownloadIcon from '@mui/icons-material/Download';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SecurityIcon from '@mui/icons-material/Security';
import TrafficIcon from '@mui/icons-material/Traffic';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CampaignIcon from '@mui/icons-material/Campaign';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

export default function Home() {
    // Quick Links with proper routes
    const quickLinks = [
        { text: 'File a Complaint', href: '/services', icon: '📝' },
        { text: 'Track Complaint Status', href: '/dashboard', icon: '🔍' },
        { text: 'Ward Performance', href: '/dashboard', icon: '📊' },
        { text: 'Tax Payment', href: '/under-construction', icon: '💰' },
        { text: 'Water Bill', href: '/under-construction', icon: '💧' },
        { text: 'Property Tax', href: '/under-construction', icon: '🏠' },
        { text: 'Building Permissions', href: '/under-construction', icon: '🏗️' },
        { text: 'Trade License', href: '/under-construction', icon: '📜' },
    ];

    // Citizen Services
    const citizenServices = [
        { text: 'Birth Certificate', href: '/under-construction', icon: '👶' },
        { text: 'Death Certificate', href: '/under-construction', icon: '📄' },
        { text: 'Marriage Registration', href: '/under-construction', icon: '💍' },
        { text: 'Ration Card', href: '/under-construction', icon: '🍚' },
        { text: 'Domicile Certificate', href: '/under-construction', icon: '🏛️' },
    ];

    const whatsNew = [
        { date: '15 Jan 2026', text: 'New online portal launched for citizen grievances.' },
        { date: '12 Jan 2026', text: 'Ward 3 wins Best Sanitation Award.' },
        { date: '10 Jan 2026', text: 'Water supply restored in Sector 5 after pipeline repair.' },
        { date: '08 Jan 2026', text: 'Pulse Polio drive scheduled for 19th January.' },
    ];

    // Downloads with PDF links
    const downloads = [
        { text: 'Birth Certificate Application', href: '/under-construction' },
        { text: 'Death Certificate Application', href: '/under-construction' },
        { text: 'Trade License Form', href: '/under-construction' },
        { text: 'Building Permission Form', href: '/under-construction' },
        { text: 'NOC Application', href: '/under-construction' },
        { text: 'Water Connection Form', href: '/under-construction' },
        { text: 'Property Tax Form', href: '/under-construction' },
    ];

    // Important Links
    const importantLinks = [
        { text: 'Maharashtra Govt.', href: 'https://maharashtra.gov.in', external: true },
        { text: 'India.gov.in', href: 'https://india.gov.in', external: true },
        { text: 'RTI Online', href: 'https://rtionline.gov.in', external: true },
        { text: 'Digital India', href: 'https://digitalindia.gov.in', external: true },
        { text: 'Nagpur District', href: 'https://nagpur.gov.in', external: true },
    ];

    // Key Statistics
    const statistics = [
        { number: '13', label: 'Wards', color: '#1a4e8e' },
        { number: '52K+', label: 'Citizens', color: '#138808' },
        { number: '1000+', label: 'Cases/Month', color: '#FF9933' },
        { number: '24x7', label: 'Service', color: '#b71c1c' },
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section with Government Styling */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1a4e8e 0%, #0d2e5a 100%)',
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
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Section - Title & Info */}
                        <Grid item xs={12} md={7}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                {/* Government Badge */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <img src="/emblem_new.png" alt="Government Emblem" style={{ height: 60, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} />
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#FF9933', fontWeight: 'bold', letterSpacing: 1 }}>
                                            GOVERNMENT OF MAHARASHTRA
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
                                            जिल्हा नागपूर | District Nagpur
                                        </Typography>
                                    </Box>
                                </Box>

                                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '2rem', md: '3.5rem' }, fontFamily: 'Merriweather, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                                    माझा उमरेड
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.2rem', md: '1.8rem' }, color: '#fff' }}>
                                    Umred Nagar Parishad
                                </Typography>

                                <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 1, borderLeft: '4px solid #FF9933', mb: 3 }}>
                                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' }, lineHeight: 1.8 }}>
                                        A <strong>Digital Governance Initiative</strong> under Smart Cities Mission.
                                        Real-time ward performance monitoring, seamless grievance redressal, and transparent accountability for all citizens.
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href="/services"
                                        size="large"
                                        sx={{
                                            bgcolor: '#FF9933',
                                            color: '#000',
                                            fontWeight: 'bold',
                                            px: 4,
                                            '&:hover': { bgcolor: '#e68a00', transform: 'translateY(-2px)' },
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 15px rgba(255,153,51,0.4)'
                                        }}
                                    >
                                        📝 File Complaint
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href="/dashboard"
                                        size="large"
                                        sx={{
                                            bgcolor: '#138808',
                                            fontWeight: 'bold',
                                            px: 4,
                                            '&:hover': { bgcolor: '#0e6606', transform: 'translateY(-2px)' },
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 15px rgba(19,136,8,0.4)'
                                        }}
                                    >
                                        📊 View Dashboard
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        href="/auth/register"
                                        size="large"
                                        sx={{
                                            borderColor: '#fff',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            px: 4,
                                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: '#FF9933' },
                                        }}
                                    >
                                        Register Now
                                    </Button>
                                </Box>

                                {/* Tricolor Bar */}
                                <Box sx={{ display: 'flex', mt: 4, gap: 0 }}>
                                    <Box sx={{ width: 80, height: 6, bgcolor: '#FF9933', borderRadius: '3px 0 0 3px' }} />
                                    <Box sx={{ width: 80, height: 6, bgcolor: '#fff' }} />
                                    <Box sx={{ width: 80, height: 6, bgcolor: '#138808', borderRadius: '0 3px 3px 0' }} />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right Section - Stats Cards */}
                        <Grid item xs={12} md={5}>
                            <Grid container spacing={2}>
                                {statistics.map((stat, i) => (
                                    <Grid item xs={6} key={i}>
                                        <Paper sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            bgcolor: 'rgba(255,255,255,0.95)',
                                            borderRadius: 2,
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                            transition: 'transform 0.2s',
                                            '&:hover': { transform: 'translateY(-4px)' }
                                        }}>
                                            <Typography variant="h3" sx={{ fontWeight: 'bold', color: stat.color, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                                                {stat.number}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                                                {stat.label}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Quick Contact */}
                            <Paper sx={{ mt: 2, p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.2)' }}>
                                <Typography variant="subtitle2" sx={{ color: '#FF9933', fontWeight: 'bold', mb: 1 }}>
                                    📞 Helpline Numbers
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#fff' }}>
                                    Emergency: <strong>112</strong> | Grievance: <strong>07116-222XXX</strong>
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* News Ticker */}
            <Box sx={{ bgcolor: '#2e2e2e', color: '#fff', py: 0.5, overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '2px solid #FF9933' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', animation: 'marquee 30s linear infinite', paddingLeft: '100%' }}>
                    <CampaignIcon fontSize="small" sx={{ mr: 1, color: '#FF9933' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Welcome to Majha Umred E-Governance Portal</Typography>

                    <WaterDropIcon fontSize="small" sx={{ mr: 1, color: '#4fc3f7' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Ward No. 4 Water Supply maintenance on 16th Jan</Typography>

                    <CleaningServicesIcon fontSize="small" sx={{ mr: 1, color: '#81c784' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Clean City, Green City</Typography>

                    <Typography variant="body2" sx={{ mr: 4 }}>Download the Mobile App for faster complaints</Typography>

                    <LocalHospitalIcon fontSize="small" sx={{ mr: 1, color: '#e57373' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Pulse Polio Drive on Sunday</Typography>

                    <Typography variant="body2">Ward 3 awarded Best Sanitation</Typography>
                </Box>
                <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
            </Box>

            {/* Mission & Vision Section */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 4, borderBottom: '1px solid #ddd' }}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        {/* Vision */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ height: '100%', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#FF9933', color: '#000', p: 2, borderLeft: '5px solid #1a4e8e', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <VisibilityIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Our Vision</Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Box sx={{ bgcolor: '#fff8e1', p: 2, borderLeft: '4px solid #FF9933', mb: 2 }}>
                                        <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 600, color: '#333' }}>
                                            "स्वच्छ, सक्षम आणि नागरिक-केंद्रित उमरेड"
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#555' }}>
                                        To transform Umred into a <strong>model township</strong> that exemplifies sustainable urban development,
                                        digital governance, and citizen empowerment with 100% digital service delivery by 2030.
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        {['Clean & Green City by 2030', '100% Digital Service Delivery', 'Zero Pending Grievances'].map((item, i) => (
                                            <Typography key={i} variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                <StarIcon fontSize="small" sx={{ color: '#FF9933' }} /> {item}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Mission */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ height: '100%', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                                <Box sx={{ bgcolor: '#138808', color: '#fff', p: 2, borderLeft: '5px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <TrackChangesIcon />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Our Mission</Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Box sx={{ bgcolor: '#e8f5e9', p: 2, borderLeft: '4px solid #138808', mb: 2 }}>
                                        <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight: 600, color: '#333' }}>
                                            "सेवा, पारदर्शकता, विकास"
                                        </Typography>
                                    </Box>
                                    <List dense sx={{ py: 0 }}>
                                        {[
                                            'Efficient and transparent civic services',
                                            'Clean drinking water to every household',
                                            'Hygienic sanitation across all 13 wards',
                                            'Digital literacy and e-governance promotion',
                                        ].map((item, i) => (
                                            <ListItem key={i} sx={{ px: 0, py: 0.3 }}>
                                                <ListItemIcon sx={{ minWidth: 24 }}>
                                                    <CheckCircleIcon fontSize="small" sx={{ color: '#138808' }} />
                                                </ListItemIcon>
                                                <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.85rem', color: '#555' }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Main Content with 3-Column Layout */}
            <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
                <Grid container spacing={3} direction={{ xs: 'column', md: 'row' }}>

                    {/* Left Sidebar - Government Style */}
                    <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>

                        {/* Quick Links Section */}
                        <Paper sx={{ bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 1.5, borderLeft: '4px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>⚡ Quick Links</Typography>
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
                                            py: 1,
                                            '&:hover': { bgcolor: '#e8f4fc', pl: 2.5, color: '#1a4e8e' },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, color: '#1a4e8e', fontSize: '0.9rem' }}>{link.icon}</ListItemIcon>
                                        <ListItemText primary={link.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
                                        <ArrowRightIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Citizen Services Section */}
                        <Paper sx={{ mt: 2, bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#e65100', color: '#fff', p: 1.5, borderLeft: '4px solid #1a4e8e', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>🏛️ Citizen Services</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {citizenServices.map((service, i) => (
                                    <ListItem
                                        key={i}
                                        component={Link}
                                        href={service.href}
                                        sx={{
                                            color: '#333',
                                            borderBottom: '1px solid #eee',
                                            py: 1,
                                            '&:hover': { bgcolor: '#fff3e0', pl: 2.5, color: '#e65100' },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, fontSize: '0.9rem', color: '#e65100' }}>{service.icon}</ListItemIcon>
                                        <ListItemText primary={service.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
                                        <ArrowRightIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Downloads Section */}
                        <Paper sx={{ mt: 2, bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd', boxShadow: 2 }}>
                            <Box sx={{ bgcolor: '#138808', color: '#fff', p: 1.5, borderLeft: '4px solid #FF9933', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>📥 Downloads</Typography>
                            </Box>
                            <List dense sx={{ py: 0, maxHeight: 200, overflow: 'auto' }}>
                                {downloads.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        component={Link}
                                        href={item.href}
                                        sx={{
                                            borderBottom: '1px solid #eee',
                                            py: 0.8,
                                            '&:hover': { bgcolor: '#e8f5e9', pl: 2.5 },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, color: '#138808' }}><DownloadIcon sx={{ fontSize: 18 }} /></ListItemIcon>
                                        <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.8rem', color: '#333' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Important Links Section */}
                        <Paper sx={{ mt: 2, bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd', boxShadow: 2 }}>
                            <Box sx={{ bgcolor: '#FF9933', color: '#fff', p: 1.5, borderLeft: '4px solid #138808', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>🔗 Important Links</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {importantLinks.map((link, i) => (
                                    <ListItem
                                        key={i}
                                        component="a"
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            borderBottom: '1px solid #eee',
                                            py: 0.8,
                                            '&:hover': { bgcolor: '#fff3e0', pl: 2.5 },
                                            transition: 'all 0.2s',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28, color: '#FF9933' }}><ArrowRightIcon sx={{ fontSize: 18 }} /></ListItemIcon>
                                        <ListItemText
                                            primary={link.text}
                                            primaryTypographyProps={{ fontSize: '0.8rem', color: '#1a4e8e', fontWeight: 500 }}
                                        />
                                        <Typography variant="caption" sx={{ color: '#999', fontSize: '0.65rem' }}>↗</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                    </Grid>

                    {/* Center - Main Content */}
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>

                        {/* Civic Services */}
                        <Paper sx={{ mb: 3, overflow: 'hidden', borderRadius: 0, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#1a4e8e', color: '#fff', p: 2, borderLeft: '5px solid #FF9933' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>🏛️ Civic Services</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    {[
                                        { title: 'Water Supply', icon: <WaterDropIcon fontSize="large" color="primary" />, desc: 'Real-time water pressure and quality monitoring.' },
                                        { title: 'Sanitation', icon: <CleaningServicesIcon fontSize="large" color="success" />, desc: 'Garbage collection and cleanliness audits.' },
                                        { title: 'Public Safety', icon: <SecurityIcon fontSize="large" color="error" />, desc: 'Crime spots and disaster readiness.' },
                                        { title: 'Roads & Transport', icon: <TrafficIcon fontSize="large" sx={{ color: '#FF9933' }} />, desc: 'Pothole reporting and traffic updates.' },
                                        { title: 'Health', icon: <LocalHospitalIcon fontSize="large" color="error" />, desc: 'Hospital availability and AQI.' },
                                        { title: 'Power Supply', icon: <LightbulbIcon fontSize="large" color="warning" />, desc: 'Street light and outage reporting.' },
                                    ].map((feature, index) => (
                                        <Grid item key={index} xs={6} sm={4}>
                                            <Paper sx={{
                                                p: { xs: 2, md: 3 },
                                                textAlign: 'center',
                                                height: '100%',
                                                transition: '0.2s',
                                                borderRadius: 0,
                                                border: '1px solid #eee',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                '&:hover': { transform: 'translateY(-3px)', boxShadow: 2, borderColor: '#FF9933' }
                                            }}>
                                                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>{feature.title}</Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>{feature.desc}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>

                        {/* Mini Ward Map */}
                        <Paper sx={{ p: 2, border: '1px solid #eee', borderRadius: 0, boxShadow: 3, '&:hover': { boxShadow: 4 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '2px solid #FF9933', pb: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000080' }}>
                                    🗺️ Ward Map - Umred
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666' }}>
                                    13 Administrative Wards
                                </Typography>
                            </Box>

                            <Box sx={{ position: 'relative', width: '100%', bgcolor: '#e8f4fc', borderRadius: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                                <svg viewBox="0 0 600 500" style={{ width: '100%', maxWidth: 400, height: 'auto' }}>
                                    {/* Ward 1 */}
                                    <polygon points="50,80 150,60 180,120 120,160 40,140" fill="#FF6B6B" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 1</title>
                                    </polygon>
                                    <text x="100" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">1</text>

                                    {/* Ward 2 */}
                                    <polygon points="150,60 280,50 300,100 180,120" fill="#4ECDC4" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 2</title>
                                    </polygon>
                                    <text x="215" y="90" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">2</text>

                                    {/* Ward 3 */}
                                    <polygon points="280,50 400,55 420,110 300,100" fill="#45B7D1" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 3</title>
                                    </polygon>
                                    <text x="350" y="85" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">3</text>

                                    {/* Ward 4 */}
                                    <polygon points="400,55 530,70 550,140 420,110" fill="#96CEB4" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 4</title>
                                    </polygon>
                                    <text x="475" y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">4</text>

                                    {/* Ward 5 */}
                                    <polygon points="40,140 120,160 100,240 30,210" fill="#FFEAA7" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 5</title>
                                    </polygon>
                                    <text x="70" y="190" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">5</text>

                                    {/* Ward 6 */}
                                    <polygon points="120,160 180,120 300,100 280,180 200,220 100,240" fill="#DDA0DD" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 6</title>
                                    </polygon>
                                    <text x="190" y="175" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">6</text>

                                    {/* Ward 7 */}
                                    <polygon points="300,100 420,110 440,200 350,220 280,180" fill="#F0A500" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 7</title>
                                    </polygon>
                                    <text x="360" y="165" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">7</text>

                                    {/* Ward 8 */}
                                    <polygon points="420,110 550,140 560,230 440,200" fill="#E17055" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 8</title>
                                    </polygon>
                                    <text x="495" y="170" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">8</text>

                                    {/* Ward 9 */}
                                    <polygon points="30,210 100,240 80,330 25,300" fill="#74B9FF" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 9</title>
                                    </polygon>
                                    <text x="60" y="275" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">9</text>

                                    {/* Ward 10 */}
                                    <polygon points="100,240 200,220 280,180 350,220 320,310 200,340 80,330" fill="#A29BFE" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 10</title>
                                    </polygon>
                                    <text x="200" y="280" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">10</text>

                                    {/* Ward 11 */}
                                    <polygon points="350,220 440,200 480,300 420,340 320,310" fill="#00B894" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 11</title>
                                    </polygon>
                                    <text x="400" y="275" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">11</text>

                                    {/* Ward 12 */}
                                    <polygon points="440,200 560,230 570,320 480,300" fill="#FDCB6E" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 12</title>
                                    </polygon>
                                    <text x="510" y="270" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#333">12</text>

                                    {/* Ward 13 */}
                                    <polygon points="80,330 200,340 320,310 420,340 480,300 570,320 560,420 400,450 200,440 50,400 25,300" fill="#FF7675" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>Ward 13</title>
                                    </polygon>
                                    <text x="300" y="385" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff">13</text>
                                </svg>
                            </Box>

                            <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid #eee' }}>
                                <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 1, display: 'block' }}>Ward Legend:</Typography>
                                <Grid container spacing={0.5}>
                                    {[
                                        { ward: 1, color: '#FF6B6B' }, { ward: 2, color: '#4ECDC4' }, { ward: 3, color: '#45B7D1' },
                                        { ward: 4, color: '#96CEB4' }, { ward: 5, color: '#FFEAA7' }, { ward: 6, color: '#DDA0DD' },
                                        { ward: 7, color: '#F0A500' }, { ward: 8, color: '#E17055' }, { ward: 9, color: '#74B9FF' },
                                        { ward: 10, color: '#A29BFE' }, { ward: 11, color: '#00B894' },
                                        { ward: 12, color: '#FDCB6E' }, { ward: 13, color: '#FF7675' },
                                    ].map((item) => (
                                        <Grid item key={item.ward}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, mb: 0.5, border: '1px solid #ddd', borderRadius: 1, px: 0.5, bgcolor: '#fafafa' }}>
                                                <Box sx={{ width: 8, height: 8, bgcolor: item.color, borderRadius: '50%', mr: 0.5 }} />
                                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>W{item.ward}</Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right Sidebar - Officials & News */}
                    <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
                        {/* Officials Section */}
                        <Paper sx={{ overflow: 'hidden', mb: 3, boxShadow: 3, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#b71c1c', color: '#fff', p: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>👤 Our Leadership</Typography>
                            </Box>
                            <Box sx={{ p: 0 }}>
                                <Card sx={{ mb: 0, borderRadius: 0 }}>
                                    {/* Banner Image */}
                                    <CardMedia component="img" height="100" image="/images/banner.png" alt="Banner" sx={{ objectFit: 'cover' }} />

                                    <Box sx={{ p: 2, textAlign: 'center' }}>
                                        {/* Profile Image */}
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: -6, mb: 1 }}>
                                            <CardMedia
                                                component="img"
                                                image="/images/ma'ampng.png"
                                                alt="Municipal President"
                                                sx={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid #fff', boxShadow: 3, objectFit: 'cover' }}
                                            />
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000080' }}>
                                            नगराध्यक्ष - उमरेड नगरपरिषद
                                        </Typography>

                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#FF9933', mb: 1 }}>
                                            Municipal President
                                        </Typography>

                                        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2, color: '#555' }}>
                                            "उमरेडच्या प्रगतीसाठी कटिबद्ध !"
                                        </Typography>

                                        <Divider sx={{ my: 1 }} />

                                        <Box sx={{ mt: 1 }}>
                                            <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: '#333' }}>
                                                ✨ युवा उद्योजिका
                                            </Typography>
                                            <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: '#333' }}>
                                                ✨ सामाजिक कार्यकर्त्या
                                            </Typography>
                                            <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: '#333' }}>
                                                ✨ महिला सशक्तीकरण
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>

                                {/* Rohit Karoo - Karhandla Secretary */}
                                <Card sx={{ borderRadius: 0, borderTop: '1px solid #eee' }}>
                                    <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#f9f9f9' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                                            <CardMedia
                                                component="img"
                                                image="/images/rohiy.jpeg"
                                                alt="Rohit Karoo"
                                                sx={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid #FF9933', boxShadow: 2, objectFit: 'cover' }}
                                            />
                                        </Box>

                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#000080' }}>
                                            रोहित करू
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#FF9933' }}>
                                            Rohit Karoo
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                                            Karhandla Secretary
                                        </Typography>
                                    </Box>
                                </Card>
                            </Box>
                        </Paper>

                        {/* What's New */}
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd', boxShadow: 3 }}>
                            <Box sx={{ bgcolor: '#FF9933', color: '#000', p: 2, borderLeft: '4px solid #138808' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>📰 What's New</Typography>
                            </Box>
                            <List dense sx={{ maxHeight: 250, overflow: 'auto' }}>
                                {whatsNew.map((item, i) => (
                                    <ListItem key={i} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                                        <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}><NewReleasesIcon fontSize="small" color="warning" /></ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            secondary={item.date}
                                            primaryTypographyProps={{ fontSize: '0.85rem' }}
                                            secondaryTypographyProps={{ fontSize: '0.75rem', color: '#666' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ p: 1, textAlign: 'center', borderTop: '1px solid #eee' }}>
                                <Link href="#" style={{ color: '#000080', fontSize: '0.85rem' }}>View All Announcements →</Link>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* End Main Content */}
        </div>
    );
}
