'use client';

import { useEffect, useState } from 'react';
import {
    Container, Grid, Paper, Typography, Box, CircularProgress,
    Button, Divider, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip, Card, CardContent, Avatar
} from '@mui/material';
import { useRouter } from 'next/navigation';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DescriptionIcon from '@mui/icons-material/Description';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            router.push('/auth/login');
        } else {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const applications = [
        { id: 'APP/2026/001', type: 'Trade License Renewal', date: '10 Jan 2026', status: 'In Process' },
        { id: 'APP/2026/045', type: 'Building Permission', date: '05 Jan 2026', status: 'Approved' },
    ];

    const payments = [
        { id: 'TXN88291', type: 'Property Tax', amount: '₹ 2,400', date: '12 Dec 2025', status: 'Success' },
        { id: 'TXN88102', type: 'Water Bill', amount: '₹ 450', date: '10 Nov 2025', status: 'Success' },
    ];

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>

            {/* Page Header */}
            <Box sx={{ mb: 4, borderBottom: '1px solid #ddd', pb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000080', flexGrow: 1 }}>
                    Citizen Dashboard
                </Typography>
                <Chip
                    icon={<VerifiedIcon />}
                    label="Verified Citizen"
                    color="success"
                    variant="outlined"
                    sx={{ fontWeight: 'bold' }}
                />
            </Box>

            <Grid container spacing={3}>

                {/* LEFT COLUMN: Profile & Quick Actions */}
                <Grid item xs={12} md={4}>

                    {/* Profile Card */}
                    <Paper sx={{ p: 0, mb: 3, borderRadius: 0, border: '1px solid #ddd' }}>
                        <Box sx={{ bgcolor: '#000080', p: 2, color: '#fff' }}>
                            <Typography variant="h6">👤 My Profile</Typography>
                        </Box>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Avatar sx={{ width: 80, height: 80, margin: '0 auto', bgcolor: '#FF9933', fontSize: '2rem' }}>
                                {user.name.charAt(0)}
                            </Avatar>
                            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>{user.name}</Typography>
                            <Typography variant="body2" color="text.secondary">Ward No: {user.ward}</Typography>
                            <Typography variant="body2" color="text.secondary">Mobile: +91 XXXXX XXXXX</Typography>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                                <Box>
                                    <Typography variant="h6" color="primary">85%</Typography>
                                    <Typography variant="caption">Profile Complete</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" color="success.main">0</Typography>
                                    <Typography variant="caption">Pending Fines</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Paper>

                    {/* Quick Actions */}
                    <Paper sx={{ p: 0, borderRadius: 0, border: '1px solid #ddd' }}>
                        <Box sx={{ bgcolor: '#FF9933', p: 2, color: '#000' }}>
                            <Typography variant="h6">⚡ Quick Actions</Typography>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {[
                                    { label: 'Pay Property Tax', icon: <HomeWorkIcon />, color: '#1a4e8e' },
                                    { label: 'Pay Water Bill', icon: <WaterDropIcon />, color: '#0288d1' },
                                    { label: 'File Grievance', icon: <ReportProblemIcon />, color: '#d32f2f' },
                                    { label: 'Birth Certificate', icon: <DescriptionIcon />, color: '#388e3c' },
                                ].map((action, i) => (
                                    <Grid item xs={6} key={i}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                py: 2,
                                                height: '100%',
                                                color: action.color,
                                                borderColor: '#eee',
                                                '&:hover': { bgcolor: '#f5f5f5', borderColor: action.color }
                                            }}
                                        >
                                            <Box sx={{ mb: 1 }}>{action.icon}</Box>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{action.label}</Typography>
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Paper>

                </Grid>

                {/* RIGHT COLUMN: Status & Lists */}
                <Grid item xs={12} md={8}>

                    {/* Notifications */}
                    <Paper sx={{ mb: 3, p: 2, bgcolor: '#fff3e0', borderLeft: '4px solid #FF9933', borderRadius: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NotificationsActiveIcon color="warning" sx={{ mr: 2 }} />
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Important Alert for Ward {user.ward}</Typography>
                                <Typography variant="body2">Door-to-door waste collection timings changed to 7:00 AM from tomorrow.</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Applications */}
                    <Paper sx={{ mb: 3, borderRadius: 0, overflow: 'hidden', border: '1px solid #ddd' }}>
                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ color: '#333' }}>📂 My Applications</Typography>
                            <Button size="small">View All</Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#fafafa' }}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Application ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {applications.map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    size="small"
                                                    color={row.status === 'Approved' ? 'success' : 'warning'}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Payments */}
                    <Paper sx={{ borderRadius: 0, overflow: 'hidden', border: '1px solid #ddd' }}>
                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ color: '#333' }}>💳 Payment History</Typography>
                            <Button size="small">View All</Button>
                        </Box>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#fafafa' }}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Receipt No</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {payments.map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>
                                                <Chip label={row.status} size="small" color="success" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                </Grid>
            </Grid>
        </Container>
    );
}
