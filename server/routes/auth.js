const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, protect, setAuthCookie, clearAuthCookie } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimit');
const { validate, registerSchema, loginSchema, checkPasswordStrength } = require('../middleware/validation');

// ===================
// Authentication Routes
// ===================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public (rate limited)
 */
router.post('/register',
    authLimiter,
    validate(registerSchema),
    async (req, res) => {
        const { name, email, password, ward, idProofType, idProofNumber, phone } = req.body;

        try {
            // Check password strength
            const passwordCheck = checkPasswordStrength(password);
            if (passwordCheck.strength === 'weak') {
                return res.status(400).json({
                    success: false,
                    message: 'Password is too weak',
                    passwordStrength: passwordCheck.strength,
                    suggestions: passwordCheck.feedback
                });
            }

            // Check if user exists
            const userExists = await User.findOne({ email: email.toLowerCase() });
            if (userExists) {
                return res.status(400).json({
                    success: false,
                    message: 'An account with this email already exists'
                });
            }

            // Create user
            const user = await User.create({
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password,
                ward: ward || 'Ward 1',
                idProofType,
                idProofNumber: idProofNumber.trim(),
                phone
            });

            const token = generateToken(user._id);

            // Set httpOnly cookie for secure auth
            setAuthCookie(res, token);

            res.status(201).json({
                success: true,
                message: 'Registration successful',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    ward: user.ward
                },
                token // Also return token for backward compatibility
            });
        } catch (error) {
            console.error('Registration error:', error.message);

            // Handle duplicate key error
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'An account with this email or ID already exists'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Registration failed. Please try again.'
            });
        }
    }
);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public (rate limited)
 */
router.post('/login',
    authLimiter,
    validate(loginSchema),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            // Find user by email (case insensitive)
            const user = await User.findOne({ email: email.toLowerCase() });

            if (!user) {
                // Use generic message to prevent user enumeration
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Check password
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Generate token and set cookie
            const token = generateToken(user._id);
            setAuthCookie(res, token);

            // Success - return user data and token
            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    ward: user.ward,
                    profileCompleted: user.profileCompleted
                },
                token // Also return for backward compatibility
            });
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({
                success: false,
                message: 'Login failed. Please try again.'
            });
        }
    }
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private
 */
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user data'
        });
    }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and clear auth cookie
 * @access  Public
 */
router.post('/logout', (req, res) => {
    clearAuthCookie(res);
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

/**
 * @route   POST /api/auth/check-password-strength
 * @desc    Check password strength without registration
 * @access  Public
 */
router.post('/check-password-strength', (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'Password is required'
        });
    }

    const result = checkPasswordStrength(password);
    res.json({
        success: true,
        ...result
    });
});

module.exports = router;

