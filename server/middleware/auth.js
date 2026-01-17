/**
 * Authentication Middleware
 * Centralized authentication handling for all protected routes
 * Supports both httpOnly cookies (preferred) and Authorization header (backward compatibility)
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');

// Cookie configuration
const COOKIE_NAME = 'auth_token';
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: config.isProduction, // HTTPS only in production
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/',
};

/**
 * Extract token from request (cookie or header)
 * @param {Request} req - Express request
 * @returns {string|null} JWT token or null
 */
const extractToken = (req) => {
    // Priority 1: httpOnly cookie (more secure)
    if (req.cookies && req.cookies[COOKIE_NAME]) {
        return req.cookies[COOKIE_NAME];
    }

    // Priority 2: Authorization header (backward compatibility)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
};

/**
 * Protect routes - Require valid JWT token
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {Function} next - Express next function
 */
const protect = async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        return next();
    } catch (error) {
        console.error('Token verification failed:', error.message);

        // Clear invalid cookie
        if (req.cookies && req.cookies[COOKIE_NAME]) {
            res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
        }

        return res.status(401).json({
            success: false,
            message: 'Not authorized, token invalid or expired'
        });
    }
};

/**
 * Optional authentication - Attach user if token present, continue otherwise
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {Function} next - Express next function
 */
const optionalAuth = async (req, res, next) => {
    const token = extractToken(req);

    if (token) {
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            // Token invalid, but continue without user
            req.user = null;
        }
    } else {
        req.user = null;
    }

    next();
};

/**
 * Require specific roles
 * @param  {...string} roles - Allowed roles
 * @returns {Function} Middleware function
 */
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Required role: ' + roles.join(' or ')
            });
        }

        next();
    };
};

/**
 * Admin only middleware
 */
const adminOnly = requireRole('admin');

/**
 * Officials and admins only
 */
const officialOrAdmin = requireRole('official', 'admin');

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @param {string} [expiresIn='30d'] - Token expiration
 * @returns {string} JWT token
 */
const generateToken = (id, expiresIn = '30d') => {
    return jwt.sign({ id }, config.JWT_SECRET, { expiresIn });
};

/**
 * Set auth token in httpOnly cookie
 * @param {Response} res - Express response
 * @param {string} token - JWT token
 */
const setAuthCookie = (res, token) => {
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
};

/**
 * Clear auth cookie (for logout)
 * @param {Response} res - Express response
 */
const clearAuthCookie = (res) => {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: config.isProduction,
        sameSite: 'strict',
        path: '/',
    });
};

module.exports = {
    protect,
    optionalAuth,
    requireRole,
    adminOnly,
    officialOrAdmin,
    generateToken,
    setAuthCookie,
    clearAuthCookie,
    COOKIE_NAME,
    extractToken
};

