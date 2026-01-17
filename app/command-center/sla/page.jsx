'use client';

import { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, Box, Grid, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Card, CardContent, CircularProgress, LinearProgress,
    FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment,
    Tabs, Tab
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// SLA data by department
const departmentSLA = [
    { dept: 'Roads & Infrastructure', total: 45, onTrack: 32, atRisk: 8, breached: 5, avgResolution: 3.2, target: 5 },
    { dept: 'Water Supply', total: 38, onTrack: 28, atRisk: 6, breached: 4, avgResolution: 2.8, target: 3 },
    { dept: 'Electrical', total: 22, onTrack: 18, atRisk: 3, breached: 1, avgResolution: 1.5, target: 2 },
    { dept: 'Sanitation', total: 56, onTrack: 48, atRisk: 5, breached: 3, avgResolution: 1.2, target: 2 },
    { dept: 'Enforcement', total: 12, onTrack: 8, atRisk: 2, breached: 2, avgResolution: 6.5, target: 7 },
    { dept: 'Revenue', total: 28, onTrack: 25, atRisk: 2, breached: 1, avgResolution: 4.1, target: 5 }
];

// Individual tickets at risk
const ticketsAtRisk = [
    { id: 'GRV-012026-00142', type: 'Pothole', dept: 'Roads', ward: 4, hoursLeft: 2, priority: 'critical', citizen: 'Ramesh K.' },
    { id: 'GRV-012026-00138', type: 'Water Leak', dept: 'Water Supply', ward: 9, hoursLeft: 5, priority: 'high', citizen: 'Sunita D.' },
    { id: 'GRV-012026-00135', type: 'Garbage', dept: 'Sanitation', ward: 3, hoursLeft: 8, priority: 'medium', citizen: 'Mahesh P.' },
    { id: 'GRV-012026-00131', type: 'Street Light', dept: 'Electrical', ward: 6, hoursLeft: 12, priority: 'high', citizen: 'Vijay M.' },
    { id: 'APP-012026-00089', type: 'Birth Cert', dept: 'Revenue', ward: 2, hoursLeft: 24, priority: 'medium', citizen: 'Priya S.' },
    { id: 'GRV-012026-00128', type: 'Encroachment', dept: 'Enforcement', ward: 7, hoursLeft: 48, priority: 'low', citizen: 'Amit R.' }
];

// Escalation queue
const escalationQueue = [
    { id: 'GRV-012026-00098', type: 'Road Damage', from: 'Roads', to: 'Chief Engineer', reason: 'Budget approval needed', status: 'pending' },
    { id: 'GRV-012026-00076', type: 'Illegal Construction', from: 'Enforcement', to: 'Commissioner', reason: 'Legal opinion required', status: 'approved' },
    { id: 'GRV-012026-00054', type: 'Water Contamination', from: 'Water Supply', to: 'Health Dept', reason: 'Health assessment needed', status: 'in_progress' }
];

const priorityColors = { low: '#388e3c', medium: '#1976d2', high: '#f57c00', critical: '#d32f2f' };

function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null;
}

export default function SLADashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [deptFilter, setDeptFilter] = useState('all');
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

    const totalTickets = departmentSLA.reduce((sum, d) => sum + d.total, 0);
    const totalOnTrack = departmentSLA.reduce((sum, d) => sum + d.onTrack, 0);
    const totalAtRisk = departmentSLA.reduce((sum, d) => sum + d.atRisk, 0);
    const totalBreached = departmentSLA.reduce((sum, d) => sum + d.breached, 0);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="flex flex-col">
            {/* Header */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                color: '#fff',
                py: 3,
                borderBottom: '4px solid #FF9933'
            }}>
                <Container maxWidth="lg">
                    <Button
                        component={Link}
                        href="/command-center"
                        startIcon={<ArrowBackIcon />}
                        sx={{ color: '#fff', mb: 2 }}
                    >
                        Back to Command Center
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AccessTimeIcon sx={{ fontSize: 40 }} />
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                SLA Monitoring Dashboard
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Track service level agreements across departments
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={6} md={3}>
                        <Card sx={{ bgcolor: '#e3f2fd', border: '2px solid #1976d2' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{totalTickets}</Typography>
                                <Typography variant="body2" color="textSecondary">Total Active</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{ bgcolor: '#e8f5e9', border: '2px solid #388e3c' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#388e3c' }}>{totalOnTrack}</Typography>
                                <Typography variant="body2" color="textSecondary">On Track</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{ bgcolor: '#fff3e0', border: '2px solid #f57c00' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#f57c00' }}>{totalAtRisk}</Typography>
                                <Typography variant="body2" color="textSecondary">At Risk</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card sx={{ bgcolor: '#ffebee', border: '2px solid #d32f2f' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>{totalBreached}</Typography>
                                <Typography variant="body2" color="textSecondary">SLA Breached</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Tabs */}
                <Paper sx={{ borderRadius: 0, boxShadow: 3 }}>
                    <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth" sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                        <Tab label="Department Overview" sx={{ fontWeight: 'bold' }} />
                        <Tab label={`At Risk (${totalAtRisk})`} sx={{ fontWeight: 'bold' }} />
                        <Tab label={`Escalations (${escalationQueue.length})`} sx={{ fontWeight: 'bold' }} />
                    </Tabs>

                    {/* Department Overview */}
                    <TabPanel value={activeTab} index={0}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>On Track</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>At Risk</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Breached</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Avg Resolution</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Performance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {departmentSLA.map((dept) => {
                                        const performance = (dept.onTrack / dept.total) * 100;
                                        return (
                                            <TableRow key={dept.dept} hover>
                                                <TableCell sx={{ fontWeight: 'bold' }}>{dept.dept}</TableCell>
                                                <TableCell align="center">{dept.total}</TableCell>
                                                <TableCell align="center">
                                                    <Chip label={dept.onTrack} size="small" sx={{ bgcolor: '#e8f5e9', color: '#388e3c' }} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip label={dept.atRisk} size="small" sx={{ bgcolor: '#fff3e0', color: '#f57c00' }} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip label={dept.breached} size="small" sx={{ bgcolor: '#ffebee', color: '#d32f2f' }} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                                        <Typography variant="body2">{dept.avgResolution} days</Typography>
                                                        {dept.avgResolution <= dept.target ? (
                                                            <TrendingUpIcon sx={{ color: '#388e3c', fontSize: 16 }} />
                                                        ) : (
                                                            <WarningIcon sx={{ color: '#f57c00', fontSize: 16 }} />
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={performance}
                                                            sx={{
                                                                width: 80,
                                                                height: 8,
                                                                borderRadius: 4,
                                                                bgcolor: '#eee',
                                                                '& .MuiLinearProgress-bar': {
                                                                    bgcolor: performance >= 80 ? '#388e3c' : performance >= 60 ? '#f57c00' : '#d32f2f'
                                                                }
                                                            }}
                                                        />
                                                        <Typography variant="caption">{performance.toFixed(0)}%</Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>

                    {/* At Risk Tickets */}
                    <TabPanel value={activeTab} index={1}>
                        <Box sx={{ p: 2 }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#fff3e0' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Ticket ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Ward</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Time Left</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Citizen</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ticketsAtRisk.map((ticket) => (
                                            <TableRow key={ticket.id} hover sx={{
                                                bgcolor: ticket.hoursLeft <= 4 ? '#ffebee' : ticket.hoursLeft <= 12 ? '#fff3e0' : 'inherit'
                                            }}>
                                                <TableCell>{ticket.id}</TableCell>
                                                <TableCell>{ticket.type}</TableCell>
                                                <TableCell>{ticket.dept}</TableCell>
                                                <TableCell>Ward {ticket.ward}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        {ticket.hoursLeft <= 4 ? (
                                                            <ErrorIcon sx={{ color: '#d32f2f', fontSize: 18 }} />
                                                        ) : ticket.hoursLeft <= 12 ? (
                                                            <WarningIcon sx={{ color: '#f57c00', fontSize: 18 }} />
                                                        ) : (
                                                            <AccessTimeIcon sx={{ color: '#1976d2', fontSize: 18 }} />
                                                        )}
                                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                            {ticket.hoursLeft}h
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={ticket.priority}
                                                        size="small"
                                                        sx={{ bgcolor: priorityColors[ticket.priority], color: '#fff', fontWeight: 'bold' }}
                                                    />
                                                </TableCell>
                                                <TableCell>{ticket.citizen}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </TabPanel>

                    {/* Escalations */}
                    <TabPanel value={activeTab} index={2}>
                        <Box sx={{ p: 2 }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f3e5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Ticket</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>From</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Escalated To</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {escalationQueue.map((esc) => (
                                            <TableRow key={esc.id} hover>
                                                <TableCell>{esc.id}</TableCell>
                                                <TableCell>{esc.type}</TableCell>
                                                <TableCell>{esc.from}</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>{esc.to}</TableCell>
                                                <TableCell>{esc.reason}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={esc.status.replace('_', ' ')}
                                                        size="small"
                                                        color={esc.status === 'approved' ? 'success' : esc.status === 'pending' ? 'warning' : 'info'}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </TabPanel>
                </Paper>
            </Container>
        </div>
    );
}
