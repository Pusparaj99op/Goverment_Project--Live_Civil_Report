/**
 * Rate Limiting Middleware
 * Protect routes from brute force and abuse
 */

const rateLimit = require('express-rate-limit');

// ===================
// Rate Limit Configurations
// ===================

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Authentication rate limiter (login/register)
 * 5 attempts per 15 minutes per IP
 * More strict to prevent brute force attacks
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many authentication attempts. Please try again after 15 minutes.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false, // count all requests
});

/**
 * Strict authentication limiter for password reset
 * 3 attempts per hour per IP
 */
const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 requests per hour
    message: {
        success: false,
        message: 'Too many password reset attempts. Please try again after an hour.',
        retryAfter: '1 hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * File upload rate limiter
 * 10 uploads per 10 minutes per IP
 */
const uploadLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // limit each IP to 10 uploads per windowMs
    message: {
        success: false,
        message: 'Too many file uploads. Please try again later.',
        retryAfter: '10 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * AI Chat rate limiter
 * 30 messages per 5 minutes per IP
 */
const chatLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 30, // limit each IP to 30 messages per windowMs
    message: {
        success: false,
        message: 'Too many chat messages. Please slow down.',
        retryAfter: '5 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Payment rate limiter
 * 10 payment attempts per hour per IP
 */
const paymentLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 10 payment attempts per hour
    message: {
        success: false,
        message: 'Too many payment attempts. Please try again later.',
        retryAfter: '1 hour'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Create custom rate limiter with options
 * @param {Object} options - Rate limiter options
 * @returns {Function} Express rate limit middleware
 */
const createLimiter = (options) => {
    const defaultOptions = {
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            success: false,
            message: 'Too many requests, please try again later.'
        }
    };

    return rateLimit({ ...defaultOptions, ...options });
};

module.exports = {
    generalLimiter,
    authLimiter,
    passwordResetLimiter,
    uploadLimiter,
    chatLimiter,
    paymentLimiter,
    createLimiter
};
