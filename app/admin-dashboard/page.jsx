'use client';

import { useState, useEffect } from 'react';
import {
    Container, Grid, Paper, Typography, Box, Button, Divider,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Card, CardContent, LinearProgress, Avatar, IconButton,
    Switch, Alert, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import CloudIcon from '@mui/icons-material/Cloud';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import BugReportIcon from '@mui/icons-material/BugReport';
import SpeedIcon from '@mui/icons-material/Speed';
import BackupIcon from '@mui/icons-material/Backup';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import TerminalIcon from '@mui/icons-material/Terminal';
import SettingsIcon from '@mui/icons-material/Settings';

export default function AdminDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Mock system data
    const systemHealth = {
        status: 'Operational',
        uptime: '15 days, 7 hours, 23 minutes',
        lastRestart: '01 Jan 2026, 09:30 AM',
        nodeVersion: 'v20.10.0',
        nextjsVersion: '14.1.0',
        mongoVersion: '7.0.4',
        environment: 'Production',
    };

    const serverMetrics = [
        { label: 'CPU Usage', value: 23, unit: '%', status: 'healthy', icon: <MemoryIcon /> },
        { label: 'Memory Usage', value: 58, unit: '%', status: 'healthy', icon: <StorageIcon /> },
        { label: 'Disk Usage', value: 34, unit: '%', status: 'healthy', icon: <CloudIcon /> },
        { label: 'Network I/O', value: 12, unit: 'MB/s', status: 'healthy', icon: <SpeedIcon /> },
    ];

    const userStats = {
        total: 12456,
        citizens: 12389,
        officials: 54,
        admins: 13,
        newToday: 18,
        newThisWeek: 234,
        activeNow: 47,
    };

    const databaseStats = {
        collections: [
            { name: 'users', documents: 12456, size: '4.2 MB' },
            { name: 'complaints', documents: 8934, size: '12.8 MB' },
            { name: 'applications', documents: 5621, size: '8.4 MB' },
            { name: 'payments', documents: 15234, size: '6.1 MB' },
            { name: 'notifications', documents: 45678, size: '15.2 MB' },
        ],
        totalSize: '48.7 MB',
        connections: 12,
        lastBackup: '15 Jan 2026, 03:00 AM',
    };

    const recentErrors = [
        { id: 1, type: 'error', message: 'MongoDB connection timeout', timestamp: '15 Jan 2026, 10:23 AM', resolved: true },
        { id: 2, type: 'warning', message: 'High memory usage detected (85%)', timestamp: '14 Jan 2026, 11:45 PM', resolved: true },
        { id: 3, type: 'error', message: 'Failed to send email notification', timestamp: '14 Jan 2026, 08:12 PM', resolved: false },
        { id: 4, type: 'warning', message: 'Slow API response on /api/auth/login', timestamp: '14 Jan 2026, 06:30 PM', resolved: true },
        { id: 5, type: 'info', message: 'Scheduled backup completed successfully', timestamp: '14 Jan 2026, 03:00 AM', resolved: true },
    ];

    const apiMetrics = {
        totalRequests: { today: 15234, week: 89456, month: 342567 },
        avgResponseTime: '145ms',
        successRate: 99.2,
        endpoints: [
            { path: '/api/auth/login', calls: 3456, avgTime: '120ms', status: 'healthy' },
            { path: '/api/auth/register', calls: 234, avgTime: '180ms', status: 'healthy' },
            { path: '/api/complaints', calls: 5678, avgTime: '95ms', status: 'healthy' },
            { path: '/api/payments', calls: 2345, avgTime: '210ms', status: 'warning' },
        ],
    };

    const quickActions = [
        { label: 'Clear Cache', icon: <DeleteSweepIcon />, color: '#d32f2f' },
        { label: 'Trigger Backup', icon: <BackupIcon />, color: '#388e3c' },
        { label: 'Restart Server', icon: <RestartAltIcon />, color: '#FF9933' },
        { label: 'View Logs', icon: <TerminalIcon />, color: '#1a4e8e' },
        { label: 'Send Notification', icon: <NotificationsIcon />, color: '#7b1fa2' },
        { label: 'Settings', icon: <SettingsIcon />, color: '#666' },
    ];

    const getMetricColor = (value, type = 'percent') => {
        if (type === 'percent') {
            if (value < 50) return '#388e3c';
            if (value < 80) return '#FF9933';
            return '#d32f2f';
        }
        return '#1a4e8e';
    };

    const getLogIcon = (type) => {
        switch (type) {
            case 'error': return <ErrorIcon sx={{ color: '#d32f2f' }} />;
            case 'warning': return <WarningIcon sx={{ color: '#FF9933' }} />;
            case 'info': return <InfoIcon sx={{ color: '#1a4e8e' }} />;
            default: return <InfoIcon />;
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a' }}>
            {/* Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1e1e1e 0%, #0a0a0a 100%)',
                color: '#fff',
                py: 2,
                borderBottom: '2px solid #333'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#d32f2f', width: 48, height: 48 }}>
                                <AdminPanelSettingsIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    Admin Dashboard
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#888' }}>
                                    System Monitoring & Maintenance Panel
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                                icon={<CheckCircleIcon sx={{ color: '#4caf50 !important' }} />}
                                label={systemHealth.status}
                                sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', fontWeight: 'bold', border: '1px solid #4caf50' }}
                            />
                            <Typography variant="body2" sx={{ color: '#888', fontFamily: 'monospace' }}>
                                {currentTime.toLocaleString()}
                            </Typography>
                            <Button
                                startIcon={<RefreshIcon />}
                                sx={{ color: '#888', borderColor: '#444' }}
                                variant="outlined"
                                size="small"
                            >
                                Refresh
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Grid container spacing={3}>

                    {/* System Status */}
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CodeIcon sx={{ color: '#4caf50' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>System Status</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    {serverMetrics.map((metric, i) => (
                                        <Grid item xs={6} sm={3} key={i}>
                                            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#252525', borderRadius: 1 }}>
                                                <Avatar sx={{ bgcolor: 'transparent', color: getMetricColor(metric.value), width: 40, height: 40, margin: '0 auto', mb: 1 }}>
                                                    {metric.icon}
                                                </Avatar>
                                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: getMetricColor(metric.value) }}>
                                                    {metric.value}{metric.unit === '%' ? '%' : ''}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#888' }}>{metric.label}</Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={metric.unit === '%' ? metric.value : 50}
                                                    sx={{
                                                        mt: 1, height: 4, borderRadius: 2, bgcolor: '#333',
                                                        '& .MuiLinearProgress-bar': { bgcolor: getMetricColor(metric.value) }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Divider sx={{ my: 2, borderColor: '#333' }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Uptime</Typography>
                                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold' }}>{systemHealth.uptime}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Node.js</Typography>
                                        <Typography variant="body2" sx={{ color: '#4caf50', fontFamily: 'monospace' }}>{systemHealth.nodeVersion}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>MongoDB</Typography>
                                        <Typography variant="body2" sx={{ color: '#4caf50', fontFamily: 'monospace' }}>{systemHealth.mongoVersion}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Environment</Typography>
                                        <Chip label={systemHealth.environment} size="small" sx={{ bgcolor: '#388e3c', color: '#fff', fontWeight: 'bold' }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Quick Actions */}
                    <Grid item xs={12} lg={4}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2, height: '100%' }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SettingsIcon sx={{ color: '#FF9933' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>Quick Actions</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={1.5}>
                                    {quickActions.map((action, i) => (
                                        <Grid item xs={6} key={i}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    py: 1.5,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    color: action.color,
                                                    borderColor: '#333',
                                                    bgcolor: '#252525',
                                                    '&:hover': { bgcolor: '#333', borderColor: action.color }
                                                }}
                                            >
                                                {action.icon}
                                                <Typography variant="caption" sx={{ mt: 0.5, fontWeight: 'bold' }}>{action.label}</Typography>
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* User Management */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PeopleIcon sx={{ color: '#1a4e8e' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>User Statistics</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ textAlign: 'center', mb: 2 }}>
                                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a4e8e' }}>{userStats.total.toLocaleString()}</Typography>
                                    <Typography variant="caption" sx={{ color: '#888' }}>Total Registered Users</Typography>
                                </Box>
                                <Divider sx={{ my: 2, borderColor: '#333' }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4caf50' }}>{userStats.citizens.toLocaleString()}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Citizens</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF9933' }}>{userStats.officials}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Officials</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>{userStats.admins}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Admins</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 2, borderColor: '#333' }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#666' }}>New Today</Typography>
                                        <Typography variant="body1" sx={{ color: '#4caf50', fontWeight: 'bold' }}>+{userStats.newToday}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#666' }}>This Week</Typography>
                                        <Typography variant="body1" sx={{ color: '#4caf50', fontWeight: 'bold' }}>+{userStats.newThisWeek}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Active Now</Typography>
                                        <Typography variant="body1" sx={{ color: '#1a4e8e', fontWeight: 'bold' }}>{userStats.activeNow}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Database Stats */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DataObjectIcon sx={{ color: '#4caf50' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>Database</Typography>
                                </Box>
                                <Chip label="Connected" size="small" sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', fontSize: '0.7rem' }} />
                            </Box>
                            <Box sx={{ p: 0 }}>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: '#888', borderColor: '#333' }}>Collection</TableCell>
                                                <TableCell sx={{ color: '#888', borderColor: '#333' }}>Docs</TableCell>
                                                <TableCell sx={{ color: '#888', borderColor: '#333' }}>Size</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {databaseStats.collections.map((col) => (
                                                <TableRow key={col.name} hover sx={{ '&:hover': { bgcolor: '#252525' } }}>
                                                    <TableCell sx={{ color: '#fff', borderColor: '#333', fontFamily: 'monospace' }}>{col.name}</TableCell>
                                                    <TableCell sx={{ color: '#888', borderColor: '#333' }}>{col.documents.toLocaleString()}</TableCell>
                                                    <TableCell sx={{ color: '#4caf50', borderColor: '#333' }}>{col.size}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Divider sx={{ borderColor: '#333' }} />
                                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Total Size</Typography>
                                        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold' }}>{databaseStats.totalSize}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#666' }}>Last Backup</Typography>
                                        <Typography variant="body2" sx={{ color: '#4caf50', fontSize: '0.75rem' }}>{databaseStats.lastBackup}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* API Metrics */}
                    <Grid item xs={12} md={12} lg={4}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon sx={{ color: '#7b1fa2' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>API Performance</Typography>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>{apiMetrics.totalRequests.today.toLocaleString()}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Today</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>{apiMetrics.avgResponseTime}</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Avg Time</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#252525', borderRadius: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>{apiMetrics.successRate}%</Typography>
                                            <Typography variant="caption" sx={{ color: '#888' }}>Success</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                {apiMetrics.endpoints.map((ep, i) => (
                                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid #333' }}>
                                        <Typography variant="caption" sx={{ color: '#fff', fontFamily: 'monospace' }}>{ep.path}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="caption" sx={{ color: '#888' }}>{ep.avgTime}</Typography>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: ep.status === 'healthy' ? '#4caf50' : '#FF9933' }} />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Error Logs */}
                    <Grid item xs={12}>
                        <Paper sx={{ overflow: 'hidden', bgcolor: '#1e1e1e', border: '1px solid #333', borderRadius: 2 }}>
                            <Box sx={{ bgcolor: '#252525', px: 2, py: 1.5, borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <BugReportIcon sx={{ color: '#d32f2f' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>Recent Logs</Typography>
                                </Box>
                                <Button size="small" sx={{ color: '#888', borderColor: '#444' }} variant="outlined">View All Logs</Button>
                            </Box>
                            <List dense sx={{ py: 0 }}>
                                {recentErrors.map((log) => (
                                    <ListItem key={log.id} sx={{ borderBottom: '1px solid #333', py: 1.5 }}>
                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                            {getLogIcon(log.type)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={log.message}
                                            secondary={log.timestamp}
                                            primaryTypographyProps={{ sx: { color: '#fff', fontSize: '0.9rem' } }}
                                            secondaryTypographyProps={{ sx: { color: '#666', fontSize: '0.75rem' } }}
                                        />
                                        <Chip
                                            label={log.resolved ? 'Resolved' : 'Open'}
                                            size="small"
                                            sx={{
                                                bgcolor: log.resolved ? 'rgba(76, 175, 80, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                                                color: log.resolved ? '#4caf50' : '#d32f2f',
                                                fontWeight: 'bold',
                                                fontSize: '0.7rem'
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ bgcolor: '#0a0a0a', borderTop: '1px solid #333', color: '#666', py: 2, mt: 4, textAlign: 'center' }}>
                <Typography variant="body2">
                    Admin Dashboard v1.0.0 | Majha Umred Project | Developer Access Only
                </Typography>
            </Box>
        </Box>
    );
}
