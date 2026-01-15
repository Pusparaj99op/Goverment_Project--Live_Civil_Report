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

export default function Home() {
    const quickLinks = [
        'File a Complaint',
        'Track Complaint Status',
        'Ward Performance',
        'Tax Payment',
        'Water Bill',
        'Property Tax',
        'Building Permissions',
        'Trade License',
    ];

    const whatsNew = [
        { date: '15 Jan 2026', text: 'New online portal launched for citizen grievances.' },
        { date: '12 Jan 2026', text: 'Ward 3 wins Best Sanitation Award.' },
        { date: '10 Jan 2026', text: 'Water supply restored in Sector 5 after pipeline repair.' },
        { date: '08 Jan 2026', text: 'Pulse Polio drive scheduled for 19th January.' },
    ];

    const downloads = [
        'Birth Certificate Application',
        'Death Certificate Application',
        'Trade License Form',
        'Building Permission Form',
        'NOC Application',
    ];

    return (
        <div className="flex flex-col">
            {/* News Ticker */}
            <Box sx={{ bgcolor: '#2e2e2e', color: '#fff', py: 0.5, overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '2px solid #FF9933' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', animation: 'marquee 30s linear infinite', paddingLeft: '100%' }}>
                    <CampaignIcon fontSize="small" sx={{ mr: 1, color: '#FF9933' }} />
                    <Typography variant="body2" sx={{ mr: 4 }}>Welcome to Maja Umred E-Governance Portal</Typography>

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

            {/* Main Content with 3-Column Layout */}
            <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
                <Grid container spacing={3} direction={{ xs: 'column', md: 'row' }}>

                    {/* Left Sidebar - Quick Links */}
                    <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
                        <Paper sx={{ bgcolor: '#1a4e8e', color: '#fff', overflow: 'hidden', borderRadius: 0 }}>
                            <Box sx={{ bgcolor: '#0d3a6e', p: 2, borderLeft: '4px solid #FF9933' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>⚡ Quick Links</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {quickLinks.map((link, i) => (
                                    <ListItem key={i} component={Link} href="#" sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                        <ListItemIcon sx={{ minWidth: 30, color: '#FF9933' }}><ArrowRightIcon /></ListItemIcon>
                                        <ListItemText primary={link} primaryTypographyProps={{ fontSize: '0.9rem' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        {/* Downloads Section */}
                        <Paper sx={{ mt: 3, bgcolor: '#fff', overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd' }}>
                            <Box sx={{ bgcolor: '#138808', color: '#fff', p: 2, borderLeft: '4px solid #FF9933' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>📥 Downloads</Typography>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {downloads.map((item, i) => (
                                    <ListItem key={i} component={Link} href="#" sx={{ borderBottom: '1px solid #eee', '&:hover': { bgcolor: '#f5f5f5' } }}>
                                        <ListItemIcon sx={{ minWidth: 30, color: '#138808' }}><DownloadIcon fontSize="small" /></ListItemIcon>
                                        <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.85rem' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Center - Main Content */}
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                        {/* Hero Banner */}
                        <Paper sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', background: 'linear-gradient(135deg, #e8f4fc 0%, #f0f8ff 100%)', mb: 3 }}>
                            <Typography component="h1" variant="h3" sx={{ fontWeight: 'bold', color: '#000080', fontSize: { xs: '1.8rem', md: '3rem' } }}>
                                माजा उमरेड
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                                Maja Umred Municipal Council
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                A Digital Governance Initiative under Smart Cities Mission. Real-time ward performance monitoring, seamless grievance redressal, and transparent accountability.
                            </Typography>
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                <Button variant="contained" component={Link} href="/dashboard" size="large" sx={{ bgcolor: '#FF9933', '&:hover': { bgcolor: '#e68a00' }, width: { xs: '100%', sm: 'auto' } }}>
                                    View Dashboard
                                </Button>
                                <Button variant="contained" component={Link} href="/auth/register" size="large" sx={{ bgcolor: '#138808', '&:hover': { bgcolor: '#0e6606' }, width: { xs: '100%', sm: 'auto' } }}>
                                    Register Now
                                </Button>
                            </Box>
                        </Paper>

                        {/* Civic Services */}
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#000080', borderBottom: '3px solid #FF9933', pb: 1, display: 'inline-block', fontSize: { xs: '1.5rem', md: '1.5rem' } }}>
                            Civic Services
                        </Typography>
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
                    </Grid>

                    {/* Right Sidebar */}
                    <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
                        {/* Officials Section */}
                        <Paper sx={{ overflow: 'hidden', mb: 3 }}>
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
                                            @bjp4india 🇮🇳 - भाजपा
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
                            </Box>
                        </Paper>

                        {/* What's New */}
                        <Paper sx={{ overflow: 'hidden', borderRadius: 0, border: '1px solid #ddd' }}>
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

            {/* Ward Map Section */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 4, mt: 4, borderTop: '3px solid #FF9933' }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000080', textAlign: 'center', mb: 1 }}>
                        🗺️ उमरेड नगर परिषद वॉर्ड नकाशा
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'center', color: '#555', mb: 4 }}>
                        Umred Municipal Council Ward Map
                    </Typography>

                    <Paper sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                            {/* Map SVG */}
                            <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg viewBox="0 0 600 500" style={{ width: '100%', maxWidth: 600, height: 'auto' }}>
                                    {/* Background */}
                                    <rect x="0" y="0" width="600" height="500" fill="#e8f4fc" rx="10" />

                                    {/* Map Title */}
                                    <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#000080">उमरेड वॉर्ड नकाशा</text>

                                    {/* Ward 1 */}
                                    <polygon points="50,80 150,60 180,120 120,160 40,140" fill="#FF6B6B" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 1 (Ward 1)</title>
                                    </polygon>
                                    <text x="100" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">1</text>

                                    {/* Ward 2 */}
                                    <polygon points="150,60 280,50 300,100 180,120" fill="#4ECDC4" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 2 (Ward 2)</title>
                                    </polygon>
                                    <text x="215" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">2</text>

                                    {/* Ward 3 */}
                                    <polygon points="280,50 400,55 420,110 300,100" fill="#45B7D1" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 3 (Ward 3)</title>
                                    </polygon>
                                    <text x="350" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">3</text>

                                    {/* Ward 4 */}
                                    <polygon points="400,55 530,70 550,140 420,110" fill="#96CEB4" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 4 (Ward 4)</title>
                                    </polygon>
                                    <text x="475" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">4</text>

                                    {/* Ward 5 */}
                                    <polygon points="40,140 120,160 100,240 30,210" fill="#FFEAA7" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 5 (Ward 5)</title>
                                    </polygon>
                                    <text x="70" y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">5</text>

                                    {/* Ward 6 */}
                                    <polygon points="120,160 180,120 300,100 280,180 200,220 100,240" fill="#DDA0DD" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 6 (Ward 6)</title>
                                    </polygon>
                                    <text x="190" y="175" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">6</text>

                                    {/* Ward 7 */}
                                    <polygon points="300,100 420,110 440,200 350,220 280,180" fill="#F0A500" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 7 (Ward 7)</title>
                                    </polygon>
                                    <text x="360" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">7</text>

                                    {/* Ward 8 */}
                                    <polygon points="420,110 550,140 560,230 440,200" fill="#E17055" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 8 (Ward 8)</title>
                                    </polygon>
                                    <text x="495" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">8</text>

                                    {/* Ward 9 */}
                                    <polygon points="30,210 100,240 80,330 25,300" fill="#74B9FF" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 9 (Ward 9)</title>
                                    </polygon>
                                    <text x="60" y="275" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">9</text>

                                    {/* Ward 10 */}
                                    <polygon points="100,240 200,220 280,180 350,220 320,310 200,340 80,330" fill="#A29BFE" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 10 (Ward 10)</title>
                                    </polygon>
                                    <text x="200" y="280" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">10</text>

                                    {/* Ward 11 */}
                                    <polygon points="350,220 440,200 480,300 420,340 320,310" fill="#00B894" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 11 (Ward 11)</title>
                                    </polygon>
                                    <text x="400" y="275" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">11</text>

                                    {/* Ward 12 */}
                                    <polygon points="440,200 560,230 570,320 480,300" fill="#FDCB6E" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 12 (Ward 12)</title>
                                    </polygon>
                                    <text x="510" y="270" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">12</text>

                                    {/* Ward 13 */}
                                    <polygon points="80,330 200,340 320,310 420,340 480,300 570,320 560,420 400,450 200,440 50,400 25,300" fill="#FF7675" stroke="#333" strokeWidth="2" style={{ cursor: 'pointer' }}>
                                        <title>वॉर्ड 13 (Ward 13)</title>
                                    </polygon>
                                    <text x="300" y="385" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">13</text>

                                    {/* Compass Rose */}
                                    <g transform="translate(540, 430)">
                                        <circle r="25" fill="#fff" stroke="#333" strokeWidth="1" />
                                        <polygon points="0,-20 3,-5 0,-8 -3,-5" fill="#FF9933" />
                                        <polygon points="0,20 3,5 0,8 -3,5" fill="#333" />
                                        <polygon points="20,0 5,3 8,0 5,-3" fill="#333" />
                                        <polygon points="-20,0 -5,3 -8,0 -5,-3" fill="#333" />
                                        <text x="0" y="-27" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FF9933">N</text>
                                    </g>

                                    {/* Scale Bar */}
                                    <g transform="translate(50, 470)">
                                        <rect x="0" y="0" width="100" height="8" fill="#333" />
                                        <rect x="0" y="0" width="50" height="8" fill="#fff" />
                                        <text x="0" y="18" fontSize="8" fill="#333">0</text>
                                        <text x="50" y="18" fontSize="8" fill="#333">1 km</text>
                                        <text x="100" y="18" fontSize="8" fill="#333">2 km</text>
                                    </g>
                                </svg>
                            </Box>

                            {/* Ward Legend */}
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#000080', borderBottom: '2px solid #FF9933', pb: 1 }}>
                                    वॉर्ड माहिती (Ward Information)
                                </Typography>
                                <Grid container spacing={1}>
                                    {[
                                        { ward: 1, color: '#FF6B6B', name: 'वॉर्ड 1' },
                                        { ward: 2, color: '#4ECDC4', name: 'वॉर्ड 2' },
                                        { ward: 3, color: '#45B7D1', name: 'वॉर्ड 3' },
                                        { ward: 4, color: '#96CEB4', name: 'वॉर्ड 4' },
                                        { ward: 5, color: '#FFEAA7', name: 'वॉर्ड 5' },
                                        { ward: 6, color: '#DDA0DD', name: 'वॉर्ड 6' },
                                        { ward: 7, color: '#F0A500', name: 'वॉर्ड 7' },
                                        { ward: 8, color: '#E17055', name: 'वॉर्ड 8' },
                                        { ward: 9, color: '#74B9FF', name: 'वॉर्ड 9' },
                                        { ward: 10, color: '#A29BFE', name: 'वॉर्ड 10' },
                                        { ward: 11, color: '#00B894', name: 'वॉर्ड 11' },
                                        { ward: 12, color: '#FDCB6E', name: 'वॉर्ड 12' },
                                        { ward: 13, color: '#FF7675', name: 'वॉर्ड 13' },
                                    ].map((item) => (
                                        <Grid item xs={6} key={item.ward}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                p: 0.5,
                                                borderRadius: 1,
                                                '&:hover': { bgcolor: '#f0f0f0' },
                                                cursor: 'pointer'
                                            }}>
                                                <Box sx={{
                                                    width: 20,
                                                    height: 20,
                                                    bgcolor: item.color,
                                                    borderRadius: '50%',
                                                    border: '2px solid #333',
                                                    flexShrink: 0
                                                }} />
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box sx={{ mt: 3, p: 2, bgcolor: '#e8f4fc', borderRadius: 1, border: '1px solid #1a4e8e' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#000080', mb: 1 }}>
                                        📌 टीप (Note):
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#555' }}>
                                        हा नकाशा प्रतिनिधित्वात्मक आहे. अचूक वॉर्ड सीमांसाठी नगर परिषद कार्यालयाशी संपर्क साधा.
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ color: '#555', mt: 1 }}>
                                        This map is representational. For exact ward boundaries, please contact the Municipal Council office.
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/services"
                                    sx={{
                                        mt: 2,
                                        bgcolor: '#FF9933',
                                        '&:hover': { bgcolor: '#e68a00' },
                                        fontWeight: 'bold'
                                    }}
                                >
                                    View Ward Services →
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </div>
    );
}
