'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, Button,
    Card, CardContent, CircularProgress, LinearProgress, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Badge, Tooltip
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrafficIcon from '@mui/icons-material/Traffic';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SpeedIcon from '@mui/icons-material/Speed';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Simulated traffic data
const generateTrafficData = () => ({
    timestamp: new Date().toLocaleTimeString('en-IN'),
    totalVehicles: Math.floor(2500 + Math.random() * 500),
    avgSpeed: Math.floor(25 + Math.random() * 15),
    congestionLevel: Math.random() > 0.7 ? 'heavy' : Math.random() > 0.4 ? 'moderate' : 'light',
    vehicleBreakdown: {
        cars: Math.floor(1200 + Math.random() * 300),
        bikes: Math.floor(800 + Math.random() * 200),
        trucks: Math.floor(150 + Math.random() * 50),
        buses: Math.floor(80 + Math.random() * 30)
    }
});

// Junction data
const junctionData = [
    { id: 'JN-01', name: 'Main Chowk', status: 'heavy', vehicles: 340, waitTime: '4.5 min', signalTiming: 120 },
    { id: 'JN-02', name: 'Bus Stand Junction', status: 'moderate', vehicles: 220, waitTime: '2.8 min', signalTiming: 90 },
    { id: 'JN-03', name: 'Hospital Road', status: 'light', vehicles: 85, waitTime: '1.2 min', signalTiming: 60 },
    { id: 'JN-04', name: 'Market Area', status: 'heavy', vehicles: 410, waitTime: '5.2 min', signalTiming: 150 },
    { id: 'JN-05', name: 'School Zone', status: 'moderate', vehicles: 180, waitTime: '2.1 min', signalTiming: 75 },
    { id: 'JN-06', name: 'Industrial Area', status: 'light', vehicles: 120, waitTime: '1.5 min', signalTiming: 60 }
];

// Alerts
const trafficAlerts = [
    { id: 1, type: 'critical', message: 'Accident reported near Main Chowk - Traffic diverted', time: '5 min ago' },
    { id: 2, type: 'warning', message: 'Heavy congestion on Market Road - Consider alternate route', time: '12 min ago' },
    { id: 3, type: 'info', message: 'Road construction on NH-7 bypass - Lane closure until 6 PM', time: '45 min ago' },
    { id: 4, type: 'success', message: 'School Zone traffic cleared - Normal flow resumed', time: '1 hour ago' }
];

// Autonomous vehicles
const autonomousFleet = [
    { id: 'AV-001', type: 'Garbage Truck', status: 'active', route: 'Ward 1-4', battery: 78, eta: '2.5 hours' },
    { id: 'AV-002', type: 'Street Sweeper', status: 'active', route: 'Main Roads', battery: 65, eta: '1.8 hours' },
    { id: 'AV-003', type: 'Water Tanker', status: 'charging', route: 'Depot', battery: 32, eta: 'Charging' },
    { id: 'AV-004', type: 'Patrol Vehicle', status: 'active', route: 'Ward 7-10', battery: 89, eta: '4 hours' }
];

const statusColors = {
    light: '#388e3c',
    moderate: '#f57c00',
    heavy: '#d32f2f'
};

const alertColors = {
    critical: { bg: '#ffebee', border: '#d32f2f' },
    warning: { bg: '#fff3e0', border: '#f57c00' },
    info: { bg: '#e3f2fd', border: '#1976d2' },
    success: { bg: '#e8f5e9', border: '#388e3c' }
};

export default function TrafficDashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trafficData, setTrafficData] = useState(generateTrafficData());
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

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setTrafficData(generateTrafficData());
        }, 8000);
        return () => clearInterval(interval);
    }, []);

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
                background: 'linear-gradient(135deg, #37474f 0%, #263238 100%)',
                color: '#fff',
                py: 2,
                borderBottom: '3px solid #FF9933'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button component={Link} href="/command-center" startIcon={<ArrowBackIcon />} sx={{ color: '#fff' }}>
                                Back
                            </Button>
                            <TrafficIcon sx={{ fontSize: 36 }} />
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    Traffic Management System
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                    Real-time traffic monitoring & autonomous fleet
                                </Typography>
                            </Box>
                        </Box>
                        <Chip
                            icon={<AccessTimeIcon />}
                            label={`Live: ${trafficData.timestamp}`}
                            sx={{ bgcolor: 'rgba(76,175,80,0.2)', color: '#4caf50' }}
                        />
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ py: 3 }}>
                {/* Main Metrics */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[
                        { label: 'Total Vehicles', value: trafficData.totalVehicles.toLocaleString(), icon: <DirectionsCarIcon />, color: '#4caf50', trend: '+8%' },
                        { label: 'Avg Speed', value: `${trafficData.avgSpeed} km/h`, icon: <SpeedIcon />, color: '#2196f3', trend: trafficData.avgSpeed > 30 ? '+5%' : '-12%' },
                        { label: 'Cars', value: trafficData.vehicleBreakdown.cars, icon: <DirectionsCarIcon />, color: '#9c27b0' },
                        { label: 'Two-Wheelers', value: trafficData.vehicleBreakdown.bikes, icon: <TwoWheelerIcon />, color: '#ff9800' },
                        { label: 'Trucks', value: trafficData.vehicleBreakdown.trucks, icon: <LocalShippingIcon />, color: '#795548' },
                        { label: 'Buses', value: trafficData.vehicleBreakdown.buses, icon: <DirectionsBusIcon />, color: '#00bcd4' }
                    ].map((metric, i) => (
                        <Grid item xs={6} sm={4} md={2} key={i}>
                            <Card sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2 }}>
                                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Box sx={{ color: metric.color }}>{metric.icon}</Box>
                                        <Typography variant="caption" sx={{ color: '#8892b0' }}>{metric.label}</Typography>
                                    </Box>
                                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                        {metric.value}
                                    </Typography>
                                    {metric.trend && (
                                        <Chip
                                            size="small"
                                            label={metric.trend}
                                            icon={metric.trend.startsWith('+') ? <TrendingUpIcon /> : <TrendingDownIcon />}
                                            sx={{
                                                mt: 0.5,
                                                bgcolor: metric.trend.startsWith('+') ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)',
                                                color: metric.trend.startsWith('+') ? '#4caf50' : '#f44336',
                                                fontSize: '0.65rem'
                                            }}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    {/* Junction Status */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2 }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrafficIcon sx={{ color: '#ff9800' }} />
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    Junction Status
                                </Typography>
                            </Box>
                            <TableContainer sx={{ maxHeight: 300 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Junction</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Status</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Vehicles</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Wait Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {junctionData.map((jn) => (
                                            <TableRow key={jn.id} hover sx={{ '&:hover': { bgcolor: '#1e3a5f' } }}>
                                                <TableCell sx={{ color: '#fff', borderColor: '#1e3a5f' }}>
                                                    <Typography variant="body2">{jn.name}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#8892b0' }}>{jn.id}</Typography>
                                                </TableCell>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    <Chip
                                                        size="small"
                                                        label={jn.status}
                                                        sx={{ bgcolor: statusColors[jn.status], color: '#fff', fontWeight: 'bold', fontSize: '0.65rem' }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ color: '#ccd6f6', borderColor: '#1e3a5f' }}>{jn.vehicles}</TableCell>
                                                <TableCell sx={{ color: '#ccd6f6', borderColor: '#1e3a5f' }}>{jn.waitTime}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* Traffic Alerts */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2 }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <WarningIcon sx={{ color: '#f44336' }} />
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    Traffic Alerts
                                </Typography>
                            </Box>
                            <Box sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
                                {trafficAlerts.map((alert) => (
                                    <Box
                                        key={alert.id}
                                        sx={{
                                            p: 1.5,
                                            mb: 1.5,
                                            bgcolor: alertColors[alert.type].bg,
                                            borderLeft: `4px solid ${alertColors[alert.type].border}`,
                                            borderRadius: 1
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                                            {alert.message}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                            {alert.time}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Autonomous Fleet */}
                    <Grid item xs={12}>
                        <Paper sx={{ bgcolor: '#112240', border: '1px solid #1e3a5f', borderRadius: 2 }}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DirectionsCarIcon sx={{ color: '#4caf50' }} />
                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    Autonomous Fleet Status
                                </Typography>
                                <Chip label="4 Vehicles" size="small" sx={{ ml: 'auto', bgcolor: 'rgba(76,175,80,0.2)', color: '#4caf50' }} />
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Vehicle ID</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Type</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Status</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Current Route</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>Battery</TableCell>
                                            <TableCell sx={{ color: '#8892b0', borderColor: '#1e3a5f' }}>ETA</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {autonomousFleet.map((vehicle) => (
                                            <TableRow key={vehicle.id} hover sx={{ '&:hover': { bgcolor: '#1e3a5f' } }}>
                                                <TableCell sx={{ color: '#4caf50', borderColor: '#1e3a5f', fontWeight: 'bold' }}>
                                                    {vehicle.id}
                                                </TableCell>
                                                <TableCell sx={{ color: '#fff', borderColor: '#1e3a5f' }}>{vehicle.type}</TableCell>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    <Chip
                                                        size="small"
                                                        label={vehicle.status}
                                                        sx={{
                                                            bgcolor: vehicle.status === 'active' ? 'rgba(76,175,80,0.2)' : 'rgba(255,152,0,0.2)',
                                                            color: vehicle.status === 'active' ? '#4caf50' : '#ff9800',
                                                            fontWeight: 'bold'
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ color: '#ccd6f6', borderColor: '#1e3a5f' }}>{vehicle.route}</TableCell>
                                                <TableCell sx={{ borderColor: '#1e3a5f' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={vehicle.battery}
                                                            sx={{
                                                                width: 60,
                                                                height: 8,
                                                                borderRadius: 4,
                                                                bgcolor: '#1e3a5f',
                                                                '& .MuiLinearProgress-bar': {
                                                                    bgcolor: vehicle.battery > 50 ? '#4caf50' : vehicle.battery > 20 ? '#ff9800' : '#f44336'
                                                                }
                                                            }}
                                                        />
                                                        <Typography variant="caption" sx={{ color: '#8892b0' }}>{vehicle.battery}%</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ color: '#ccd6f6', borderColor: '#1e3a5f' }}>{vehicle.eta}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
