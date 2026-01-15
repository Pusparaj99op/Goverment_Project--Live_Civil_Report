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
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

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

    // Navigation Links Data - Active Links
    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' }, // Consolidated services
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <Box sx={{ width: '100%', bgcolor: '#fff', fontFamily: '"Roboto", sans-serif' }}>
            {/* Top Strip - Government Standard */}
            <Box sx={{ bgcolor: '#333', color: '#fff', py: 0.5, fontSize: '0.75rem' }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'center' } }}>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, display: 'flex', gap: 2 }}>
                        <a href="https://maharashtra.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#ddd', textDecoration: 'none' }}>Government of Maharashtra</a>
                        <span style={{ color: '#666' }}>|</span>
                        <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#ddd', textDecoration: 'none' }}>India.gov.in</a>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: { xs: 1, sm: 0 } }}>
                        <span role="button" aria-label="Skip to main content" style={{ cursor: 'pointer' }}>Skip to Main Content</span>
                        <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>A+</span>
                        <span style={{ cursor: 'pointer' }}>A</span>
                        <span style={{ cursor: 'pointer' }}>A-</span>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #777', borderRadius: 1, px: 1 }}>
                            <span style={{ cursor: 'pointer', fontWeight: 'bold', marginRight: 5 }}>English</span>
                            <span style={{ fontSize: '0.8rem' }}>▼</span>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Main Header - Logos and Leadership */}
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2.5, md: 0 } }}>
                    {/* Left: Emblem and Text */}
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: { xs: 'center', md: 'left' } }}>
                        <Box sx={{ position: 'relative', height: { xs: '70px', md: '85px' }, width: 'auto', marginRight: '20px' }}>
                            <img
                                src="/emblem_new.png"
                                alt="National Emblem of India"
                                style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#000', lineHeight: 1.1, fontSize: { xs: '1.4rem', md: '1.8rem' } }}>
                                माजा उमरेड
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a4e8e', lineHeight: 1.1, textTransform: 'uppercase', fontSize: { xs: '1rem', md: '1.2rem' } }}>
                                Maja Umred
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#555', fontWeight: 500, fontSize: '0.85rem' }}>
                                Government of Maharashtra
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right: Leadership Avatars */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'nowrap' }}>
                        {/* PM Modi */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 0.5 }}>
                            <Box sx={{
                                height: '64px', width: '64px', borderRadius: '50%', overflow: 'hidden',
                                border: '3px solid #f0f0f0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src="/images/Shri Narendra Modi.jpeg"
                                    alt="Shri Narendra Modi"
                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                            <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 'bold', mt: 0.5, lineHeight: 1.2, textAlign: 'center' }}>Shri Narendra Modi</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#666', lineHeight: 1, textAlign: 'center' }}>Hon'ble PM</Typography>
                        </Box>

                        {/* Nitin Gadkari */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 0.5 }}>
                            <Box sx={{
                                height: '64px', width: '64px', borderRadius: '50%', overflow: 'hidden',
                                border: '3px solid #f0f0f0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src="/images/Nitin_Sir_Picture.webp"
                                    alt="Nitin Gadkari"
                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                            <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 'bold', mt: 0.5, lineHeight: 1.2, textAlign: 'center' }}>Shri Nitin Gadkari</Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#666', lineHeight: 1, textAlign: 'center' }}>Hon'ble Minister</Typography>
                        </Box>

                        <Box sx={{ height: '50px', width: '1px', bgcolor: '#eee', mx: 1, display: { xs: 'none', sm: 'block' } }} />

                        <img
                            src="/g20.png"
                            alt="G20 India"
                            style={{ height: '55px', width: 'auto', objectFit: 'contain', display: { xs: 'none', sm: 'block' } }}
                        />
                        <img
                            src="/swachh_bharat.png"
                            alt="Swachh Bharat"
                            style={{ height: '50px', width: 'auto', objectFit: 'contain', display: { xs: 'none', sm: 'block' } }}
                        />
                    </Box>
                </Box>
            </Container>


            {/* Navigation Bar - Saffron/Green Borders */}
            <Box sx={{ bgcolor: '#1a4e8e', borderTop: '4px solid #FF9933', borderBottom: '4px solid #138808', boxShadow: 3, position: 'relative', zIndex: 10 }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters variant="dense" sx={{ minHeight: '52px !important' }}>

                        {/* Mobile Menu Icon (Hamburger) */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{ color: '#fff' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} href={page.path}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                                <Divider />
                                {!user ? (
                                    <>
                                        <MenuItem onClick={handleCloseNavMenu} component={Link} href="/auth/login"><Typography>Login</Typography></MenuItem>
                                        <MenuItem onClick={handleCloseNavMenu} component={Link} href="/auth/register"><Typography>Register</Typography></MenuItem>
                                    </>
                                ) : (
                                    <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}><Typography color="error">Logout</Typography></MenuItem>
                                )}
                            </Menu>
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1, alignItems: 'center' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    href={page.path}
                                    sx={{
                                        color: '#fff',
                                        textTransform: 'capitalize',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        px: 2,
                                        py: 1.5,
                                        borderRadius: 0,
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', borderBottom: '2px solid #fff' }
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* Search and Auth */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search..."
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>

                            {user ? (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ color: '#FF9933', fontWeight: 'bold', mr: 2, display: { xs: 'none', md: 'block' } }}>
                                        {user.name}
                                    </Typography>
                                    <Button sx={{ color: '#fff', textTransform: 'none', bgcolor: '#b71c1c', '&:hover': { bgcolor: '#aa1919' }, borderRadius: 0 }} size="small" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </Box>
                            ) : (
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                                    <Button color="inherit" component={Link} href="/auth/login" size="small" sx={{ borderColor: 'rgba(255,255,255,0.5)', border: '1px solid' }}>Login</Button>
                                    <Button variant="contained" size="small" component={Link} href="/auth/register" sx={{ bgcolor: '#FF9933', color: '#000', fontWeight: 'bold', '&:hover': { bgcolor: '#e68a00' }, borderRadius: 0 }}>Register</Button>
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
        </Box>
    );
}
