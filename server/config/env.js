/**
 * Environment Configuration Validation
 * Validates required environment variables at startup
 */

const requiredEnvVars = [
    'JWT_SECRET',
    'MONGODB_URI'
];

const optionalEnvVars = [
    'PORT',
    'NODE_ENV',
    'REDIS_URL',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_S3_BUCKET',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET'
];

/**
 * Validate that all required environment variables are set
 * @throws {Error} If any required variable is missing
 */
const validateEnv = () => {
    const missing = [];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            missing.push(envVar);
        }
    }

    if (missing.length > 0) {
        console.error('❌ FATAL: Missing required environment variables:');
        missing.forEach(v => console.error(`   - ${v}`));
        console.error('\n📝 Please create a .env file with the required variables.');
        console.error('   See .env.example for reference.\n');
        process.exit(1);
    }

    // Validate JWT_SECRET strength
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        console.warn('⚠️  WARNING: JWT_SECRET should be at least 32 characters for security');
    }

    // Log optional vars status in development
    if (process.env.NODE_ENV !== 'production') {
        const missingOptional = optionalEnvVars.filter(v => !process.env[v]);
        if (missingOptional.length > 0) {
            console.log('ℹ️  Optional environment variables not set:');
            missingOptional.forEach(v => console.log(`   - ${v}`));
            console.log('');
        }
    }

    console.log('✅ Environment configuration validated successfully');
};

/**
 * Get a required config value
 * @param {string} key - The environment variable name
 * @returns {string} The value
 * @throws {Error} If the variable is not set
 */
const getRequired = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

/**
 * Get an optional config value with default
 * @param {string} key - The environment variable name
 * @param {*} defaultValue - Default value if not set
 * @returns {*} The value or default
 */
const getOptional = (key, defaultValue = null) => {
    return process.env[key] || defaultValue;
};

module.exports = {
    validateEnv,
    getRequired,
    getOptional,

    // Commonly accessed configs
    get JWT_SECRET() {
        return getRequired('JWT_SECRET');
    },
    get MONGODB_URI() {
        return getRequired('MONGODB_URI');
    },
    get PORT() {
        return getOptional('PORT', 5000);
    },
    get NODE_ENV() {
        return getOptional('NODE_ENV', 'development');
    },
    get isProduction() {
        return this.NODE_ENV === 'production';
    }
};
