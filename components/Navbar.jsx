'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        router.push('/auth/login');
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Navigation Links Data
    const pages = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <Box sx={{ width: '100%', bgcolor: '#fff' }}>
            {/* Top Strip */}
            <Box sx={{ bgcolor: '#212121', color: '#fff', py: 0.8, fontSize: '0.75rem' }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, gap: { xs: 1, sm: 0 } }}>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <span role="button" aria-label="Screen Reader Access" style={{ cursor: 'pointer', marginRight: '15px' }}>Screen Reader Access</span>
                        <span role="button" aria-label="Skip to main content" style={{ cursor: 'pointer' }}>Skip to Main Content</span>
                    </Box>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                        <span style={{ marginRight: '15px', borderRight: '1px solid #555', paddingRight: '15px' }}>A-</span>
                        <span style={{ marginRight: '15px', borderRight: '1px solid #555', paddingRight: '15px' }}>A</span>
                        <span style={{ marginRight: '15px', borderRight: '1px solid #555', paddingRight: '15px' }}>A+</span>
                        <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>English</span>
                        <span style={{ margin: '0 5px' }}>|</span>
                        <span style={{ cursor: 'pointer' }}>Hindi</span>
                    </Box>
                </Container>
            </Box>

            {/* Main Header */}
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 0 } }}>
                    {/* Left: Emblem and Text */}
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: { xs: 'center', md: 'left' } }}>
                        <Box sx={{ position: 'relative', height: { xs: '60px', md: '80px' }, width: 'auto', marginRight: '20px' }}>
                            <img
                                src="/emblem.png"
                                alt="National Emblem of India"
                                style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000', lineHeight: 1.2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                                माजा उमरेड
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000080', lineHeight: 1.2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                Maja Umred
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: '#555', fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                                Government of Maharashtra
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right: Logos */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        {/* PM Modi */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
                            <img
                                src="/images/Shri Narendra Modi.jpeg"
                                alt="Shri Narendra Modi"
                                style={{ height: '55px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }}
                            />
                            <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 'bold', mt: 0.5, lineHeight: 1 }}>Shri Narendra Modi</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#555', lineHeight: 1 }}>Hon'ble Prime Minister</Typography>
                        </Box>

                        {/* Nitin Gadkari */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
                            <img
                                src="/images/Nitin_Sir_Picture.webp"
                                alt="Nitin Gadkari"
                                style={{ height: '55px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }}
                            />
                            <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 'bold', mt: 0.5, lineHeight: 1 }}>Shri Nitin Gadkari</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#555', lineHeight: 1 }}>Hon'ble Union Minister</Typography>
                        </Box>

                        <img
                            src="/g20.png"
                            alt="G20 India"
                            style={{ height: '55px', width: 'auto', objectFit: 'contain' }}
                        />
                        <img
                            src="/swachh_bharat.png"
                            alt="Swachh Bharat"
                            style={{ height: '45px', width: 'auto', objectFit: 'contain' }}
                        />
                    </Box>
                </Box>
            </Container>


            {/* Navigation Bar */}
            <Box sx={{ bgcolor: '#1a4e8e', borderTop: '4px solid #FF9933', borderBottom: '4px solid #138808' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters variant="dense" sx={{ minHeight: '48px !important' }}>

                        {/* Mobile Menu Icon (Hamburger) */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{ color: '#fff' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} href={page.path}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                                {!user && [
                                    <MenuItem key="login" onClick={handleCloseNavMenu} component={Link} href="/auth/login">
                                        <Typography textAlign="center">Login</Typography>
                                    </MenuItem>,
                                    <MenuItem key="register" onClick={handleCloseNavMenu} component={Link} href="/auth/register">
                                        <Typography textAlign="center">Register</Typography>
                                    </MenuItem>
                                ]}
                                {user && (
                                    <MenuItem key="logout" onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
                                        <Typography textAlign="center" color="error">Logout</Typography>
                                    </MenuItem>
                                )}
                            </Menu>
                            {/* Mobile Header Text when menu is collapsed (Optional, kept simple for now) */}
                            <Typography variant="subtitle1" sx={{ color: '#fff', ml: 1, display: { xs: 'block', md: 'none' } }}>
                                Menu
                            </Typography>
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, width: '100%', alignItems: 'center' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    href={page.path}
                                    sx={{ color: '#fff', textTransform: 'capitalize', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}

                            <Box sx={{ flexGrow: 1 }} />

                            {user ? (
                                <>
                                    <Typography variant="body2" sx={{ mx: 2, color: '#FF9933', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                        {user.name} ({user.ward})
                                    </Typography>
                                    <Button sx={{ color: '#fff', bgcolor: '#b71c1c', '&:hover': { bgcolor: '#aa1919' } }} size="small" onClick={handleLogout}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" component={Link} href="/auth/login" sx={{ color: '#fff' }}>Login</Button>
                                    <Button variant="contained" size="small" sx={{ bgcolor: '#FF9933', color: '#000', '&:hover': { bgcolor: '#e68a00' } }} component={Link} href="/auth/register">Register</Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
        </Box>
    );
}
