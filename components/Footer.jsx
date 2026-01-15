import { Box, Container, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: '#1b1b1b', color: '#d1d1d1', mt: 8 }}>
            <div className="gov-gradient"></div>
            {/* Upper Footer: Links */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="primary.main" gutterBottom sx={{ color: '#FF9933' }}>
                            Information
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link href="#" color="inherit" underline="hover">About Majha Umred</Link>
                            <Link href="#" color="inherit" underline="hover">Ward Statistics</Link>
                            <Link href="#" color="inherit" underline="hover">Performance Reports</Link>
                            <Link href="#" color="inherit" underline="hover">Citizens Charter</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#FF9933' }}>
                            Services
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link href="#" color="inherit" underline="hover">Grievance Redressal</Link>
                            <Link href="#" color="inherit" underline="hover">Water Tax Payment</Link>
                            <Link href="#" color="inherit" underline="hover">Property Tax</Link>
                            <Link href="#" color="inherit" underline="hover">Birth/Death Certificates</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#FF9933' }}>
                            Important Links
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Link href="https://www.india.gov.in" target="_blank" color="inherit" underline="hover">National Portal of India</Link>
                            <Link href="https://maharashtra.gov.in" target="_blank" color="inherit" underline="hover">Maharashtra Govt</Link>
                            <Link href="https://digitalindia.gov.in" target="_blank" color="inherit" underline="hover">Digital India</Link>
                            <Link href="https://swachhbharat.mygov.in" target="_blank" color="inherit" underline="hover">Swachh Bharat</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#FF9933' }}>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Umred Municipal Council,<br />
                            Umred, Dist. Nagpur - 441203,<br />
                            Maharashtra, India.
                        </Typography>
                        <Typography variant="body2">
                            Toll Free: 1800-XXX-XXXX<br />
                            Email: contact@majaumred.gov.in
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* Lower Footer: NIC / Copyright */}
            <Box sx={{ bgcolor: '#000', py: 3, textAlign: 'center', borderTop: '1px solid #333' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Website Content Managed by <strong>Majha Umred Administration</strong>.
                    </Typography>
                    <Typography variant="caption" display="block" color="grey.500">
                        Designed, Developed and Hosted by <span style={{ color: '#fff' }}>National Informatics Centre (NIC)</span>. <br />
                        Ministry of Electronics & Information Technology, Government of India.
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <img src="/emblem.png" alt="Emblem" style={{ height: '30px', filter: 'grayscale(100%)' }} />
                        <img src="/g20.png" alt="G20" style={{ height: '30px', filter: 'grayscale(100%)' }} />
                    </Box>
                    <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                        Last Updated: 15 Jan 2026
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}
