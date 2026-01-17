/**
 * Input Validation Middleware
 * Centralized validation schemas and helpers
 */

const Joi = require('joi');

// ===================
// Validation Schemas
// ===================

/**
 * Password validation schema
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
const passwordSchema = Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=[\]{}|\\:";'<>,.?/~`-])/)
    .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    });

/**
 * Email validation schema
 */
const emailSchema = Joi.string()
    .email()
    .lowercase()
    .trim()
    .max(255)
    .messages({
        'string.email': 'Please provide a valid email address',
        'string.max': 'Email cannot exceed 255 characters'
    });

/**
 * Phone number validation (Indian format)
 */
const phoneSchema = Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .messages({
        'string.pattern.base': 'Please provide a valid 10-digit Indian mobile number'
    });

/**
 * User registration schema
 */
const registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.min': 'Name must be at least 2 characters',
            'string.max': 'Name cannot exceed 100 characters',
            'any.required': 'Name is required'
        }),
    email: emailSchema.required(),
    password: passwordSchema.required(),
    ward: Joi.string()
        .default('Ward 1'),
    idProofType: Joi.string()
        .valid('Aadhar Card', 'Voter ID', 'Driving License', 'Passport', 'PAN Card', 'Ration Card', 'Electricity Bill', 'Property Tax Receipt')
        .optional()
        .allow('')
        .messages({
            'any.only': 'Invalid ID proof type'
        }),
    idProofNumber: Joi.string()
        .trim()
        .min(5)
        .max(30)
        .optional()
        .allow('')
        .messages({
            'string.min': 'ID proof number must be at least 5 characters',
            'string.max': 'ID proof number cannot exceed 30 characters'
        }),
    phone: phoneSchema.optional()
});

/**
 * User login schema
 */
const loginSchema = Joi.object({
    email: emailSchema.required(),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
});

/**
 * Complaint submission schema
 */
const complaintSchema = Joi.object({
    type: Joi.string()
        .valid('water_supply', 'drainage', 'streetlight', 'road', 'garbage', 'sanitation', 'other')
        .required()
        .messages({
            'any.only': 'Invalid complaint type',
            'any.required': 'Complaint type is required'
        }),
    subType: Joi.string().max(100).optional(),
    description: Joi.string()
        .min(10)
        .max(2000)
        .required()
        .messages({
            'string.min': 'Description must be at least 10 characters',
            'string.max': 'Description cannot exceed 2000 characters',
            'any.required': 'Description is required'
        }),
    location: Joi.object({
        address: Joi.string().max(500),
        ward: Joi.string().max(50),
        coordinates: Joi.object({
            lat: Joi.number().min(-90).max(90),
            lng: Joi.number().min(-180).max(180)
        })
    }).optional(),
    images: Joi.array()
        .items(Joi.string().uri({ allowRelative: true }))
        .max(5)
        .optional()
});

// ===================
// Validation Middleware Factory
// ===================

/**
 * Create validation middleware for a schema
 * @param {Joi.Schema} schema - The Joi schema to validate against
 * @param {string} [property='body'] - Request property to validate (body, query, params)
 * @returns {Function} Express middleware function
 */
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // Replace request property with validated/sanitized value
        req[property] = value;
        next();
    };
};

/**
 * Sanitize string input to prevent XSS
 * @param {string} input - The input string
 * @returns {string} Sanitized string
 */
const sanitizeString = (input) => {
    if (typeof input !== 'string') return input;
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

/**
 * Check password strength and return score
 * @param {string} password - The password to check
 * @returns {Object} Strength score and feedback
 */
const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push('Use at least 8 characters');

    if (password.length >= 12) score += 1;

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Add numbers');

    if (/[@$!%*?&#^()_+=[\]{}|\\:";'<>,.?/~`-]/.test(password)) score += 1;
    else feedback.push('Add special characters');

    if (password.length >= 16) score += 1;

    let strength = 'weak';
    if (score >= 6) strength = 'strong';
    else if (score >= 4) strength = 'medium';

    return { score, strength, feedback };
};

module.exports = {
    // Schemas
    passwordSchema,
    emailSchema,
    phoneSchema,
    registerSchema,
    loginSchema,
    complaintSchema,

    // Middleware
    validate,

    // Utilities
    sanitizeString,
    checkPasswordStrength
};
