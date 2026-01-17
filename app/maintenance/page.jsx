'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, Button,
    Card, CardContent, CircularProgress, LinearProgress, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Alert
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BuildIcon from '@mui/icons-material/Build';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EngineeringIcon from '@mui/icons-material/Engineering';

// Asset health data with AI predictions
const assetData = [
    {
        id: 'WP-001',
        name: 'Main Water Pump Station',
        type: 'Water',
        health: 45,
        prediction: 'Failure likely in 15 days',
        riskLevel: 'critical',
        lastService: '45 days ago',
        nextScheduled: 'Immediate',
        issues: ['Bearing wear detected', 'Vibration anomaly']
    },
    {
        id: 'TR-012',
        name: 'Ward 4 Transformer',
        type: 'Electrical',
        health: 62,
        prediction: 'Degradation in 30 days',
        riskLevel: 'high',
        lastService: '90 days ago',
        nextScheduled: '7 days',
        issues: ['Oil temperature high', 'Load imbalance']
    },
    {
        id: 'GC-003',
        name: 'Garbage Compactor Unit 3',
        type: 'Sanitation',
        health: 78,
        prediction: 'Stable for 60+ days',
        riskLevel: 'medium',
        lastService: '30 days ago',
        nextScheduled: '30 days',
        issues: ['Hydraulic fluid low']
    },
    {
        id: 'SL-089',
        name: 'Street Light Cluster - Main Road',
        type: 'Electrical',
        health: 92,
        prediction: 'No issues predicted',
        riskLevel: 'low',
        lastService: '15 days ago',
        nextScheduled: '45 days',
        issues: []
    },
    {
        id: 'WM-045',
        name: 'Water Meter Zone 5',
        type: 'Water',
        health: 55,
        prediction: 'Calibration drift in 20 days',
        riskLevel: 'high',
        lastService: '60 days ago',
        nextScheduled: '10 days',
        issues: ['Accuracy deviation +3%']
    },
    {
        id: 'VH-002',
        name: 'Municipal Bus #2',
        type: 'Vehicle',
        health: 71,
        prediction: 'Brake service in 25 days',
        riskLevel: 'medium',
        lastService: '20 days ago',
        nextScheduled: '25 days',
        issues: ['Brake pad wear 70%']
    }
];

// Maintenance schedule
const maintenanceSchedule = [
    { date: 'Today', tasks: 2, critical: 1 },
    { date: 'Tomorrow', tasks: 3, critical: 0 },
    { date: '18 Jan', tasks: 1, critical: 0 },
    { date: '19 Jan', tasks: 4, critical: 1 },
    { date: '20 Jan', tasks: 2, critical: 0 }
];

const riskColors = { critical: '#d32f2f', high: '#f57c00', medium: '#fbc02d', low: '#388e3c' };
const typeIcons = {
    Water: <WaterDropIcon />,
    Electrical: <ElectricBoltIcon />,
    Sanitation: <LocalShippingIcon />,
    Vehicle: <LocalShippingIcon />
};

export default function MaintenanceDashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (!storedUser) {
            router.push('/auth/login');
        } else {
            const userData = JSON.parse(storedUser);
            if (userData.role === 'citizen') {
                router.push('/dashboard');
            } else {
                setUser(userData);
                setLoading(false);
            }
        }
    }, [router]);

    const criticalCount = assetData.filter(a => a.riskLevel === 'critical').length;
    const highCount = assetData.filter(a => a.riskLevel === 'high').length;
    const avgHealth = Math.round(assetData.reduce((sum, a) => sum + a.health, 0) / assetData.length);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="flex flex-col" style={{ backgroundColor: '#0a1929', minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #6a1b9a 0%, #4a148c 100%)',
                color: '#fff',
                py: 2,
                borderBottom: '3px solid #FF9933'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button component={Link} href="/command-center" startIcon={<ArrowBackIcon />} sx={{ color: '#fff' }}>
                            Back
                        </Button>
                        <BuildIcon sx={{ fontSize: 36 }} />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Predictive Maintenance
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                AI-powered asset health monitoring & failure prediction
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ py: 3 }}>
                {/* Summary Cards */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} md={3}>
                        <Card sx={{ bgcolor: '#ffebee', border: '2px solid #d32f2f' }}>
                            <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                <ErrorIcon sx={{ fontSize: 32, color: '#d32f2f' }} />
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>{criticalCount}</Typography>
                                <Typography variant="body2">Critical Alerts</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{ bgcolor: '#fff3e0', border: '2px solid #f57c00' }}>
                            <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                <WarningIcon sx={{ fontSize: 32, color: '#f57c00' }} />
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#f57c00' }}>{highCount}</Typography>
                                <Typography variant="body2">High Risk</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{ bgcolor: '#e8f5e9', border: '2px solid #388e3c' }}>
                            <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                <CheckCircleIcon sx={{ fontSize: 32, color: '#388e3c' }} />
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#388e3c' }}>{avgHealth}%</Typography>
                                <Typography variant="body2">Avg Health</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{ bgcolor: '#e3f2fd', border: '2px solid #1976d2' }}>
                            <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                <EngineeringIcon sx={{ fontSize: 32, color: '#1976d2' }} />
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{assetData.length}</Typography>
                                <Typography variant="body2">Assets Monitored</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    {/* Asset Health Table */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2 }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingDownIcon sx={{ color: '#f44336' }} />
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    Asset Health Monitor
                                </Typography>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Asset</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Health</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>AI Prediction</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Issues</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assetData.map((asset) => (
                                            <TableRow key={asset.id} hover sx={{ '&:hover': { bgcolor: '#1e3a5f' } }}>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box sx={{ color: '#8892b0' }}>{typeIcons[asset.type]}</Box>
                                                        <Box>
                                                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold' }}>{asset.name}</Typography>
                                                            <Typography variant="caption" sx={{ color: '#8892b0' }}>{asset.id}</Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={asset.health}
                                                            sx={{
                                                                width: 60,
                                                                height: 8,
                                                                borderRadius: 4,
                                                                bgcolor: '#1e3a5f',
                                                                '& .MuiLinearProgress-bar': { bgcolor: riskColors[asset.riskLevel] }
                                                            }}
                                                        />
                                                        <Typography variant="caption" sx={{ color: riskColors[asset.riskLevel], fontWeight: 'bold' }}>
                                                            {asset.health}%
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    <Chip
                                                        size="small"
                                                        label={asset.prediction}
                                                        sx={{ bgcolor: riskColors[asset.riskLevel] + '30', color: riskColors[asset.riskLevel], fontSize: '0.65rem' }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    {asset.issues.length > 0 ? (
                                                        <Box>
                                                            {asset.issues.map((issue, i) => (
                                                                <Typography key={i} variant="caption" sx={{ color: '#ff9800', display: 'block' }}>
                                                                    • {issue}
                                                                </Typography>
                                                            ))}
                                                        </Box>
                                                    ) : (
                                                        <Typography variant="caption" sx={{ color: '#4caf50' }}>No issues</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    <Button
                                                        size="small"
                                                        variant={asset.riskLevel === 'critical' ? 'contained' : 'outlined'}
                                                        color={asset.riskLevel === 'critical' ? 'error' : 'primary'}
                                                        sx={{ fontSize: '0.7rem' }}
                                                    >
                                                        {asset.nextScheduled}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* Schedule */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2, height: '100%' }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ScheduleIcon sx={{ color: '#4caf50' }} />
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    Maintenance Schedule
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                {maintenanceSchedule.map((day, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            p: 2,
                                            mb: 1.5,
                                            bgcolor: day.critical > 0 ? 'rgba(211,47,47,0.1)' : 'rgba(30,58,95,0.5)',
                                            border: `1px solid ${day.critical > 0 ? '#d32f2f' : '#1e3a5f'}`,
                                            borderRadius: 1
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold' }}>{day.date}</Typography>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Chip label={`${day.tasks} tasks`} size="small" sx={{ bgcolor: '#1976d2', color: '#fff' }} />
                                                {day.critical > 0 && (
                                                    <Chip label={`${day.critical} critical`} size="small" sx={{ bgcolor: '#d32f2f', color: '#fff' }} />
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* AI Insights */}
                <Paper sx={{ mt: 3, p: 2, bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', mb: 2 }}>🤖 AI Insights</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Alert severity="error">
                                <strong>Immediate Action:</strong> Water Pump WP-001 requires emergency inspection - bearing failure imminent
                            </Alert>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Alert severity="warning">
                                <strong>Cost Savings:</strong> Proactive maintenance on 3 assets can save ₹2.4L in emergency repairs
                            </Alert>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Alert severity="info">
                                <strong>Trend:</strong> Electrical assets showing 15% faster degradation this month - investigate power quality
                            </Alert>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
