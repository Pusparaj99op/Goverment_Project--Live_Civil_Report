/**
 * Razorpay Payment Gateway Integration
 * Handles payment processing for property tax, water bills, etc.
 */

const Razorpay = require('razorpay');
const crypto = require('crypto');
const logger = require('./logger');

// Initialize Razorpay (will fail gracefully if keys not configured)
let razorpay = null;

const initializeRazorpay = () => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
        razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });
        logger.info('Razorpay payment gateway initialized');
        return true;
    } else {
        logger.warn('Razorpay keys not configured. Payment features will use mock mode.');
        return false;
    }
};

/**
 * Check if Razorpay is configured
 * @returns {boolean}
 */
const isConfigured = () => razorpay !== null;

/**
 * Create a payment order
 * @param {Object} options - Order options
 * @param {number} options.amount - Amount in paise (INR * 100)
 * @param {string} options.currency - Currency code (default: INR)
 * @param {string} options.receipt - Unique receipt ID
 * @param {Object} options.notes - Additional notes
 * @returns {Promise<Object>} Order details
 */
const createOrder = async ({ amount, currency = 'INR', receipt, notes = {} }) => {
    if (!razorpay) {
        // Mock mode for development
        return {
            id: `order_mock_${Date.now()}`,
            amount,
            currency,
            receipt,
            status: 'created',
            mock: true,
            created_at: Date.now(),
        };
    }

    try {
        const order = await razorpay.orders.create({
            amount: Math.round(amount), // Ensure integer
            currency,
            receipt,
            notes,
        });

        logger.info('Payment order created', { orderId: order.id, amount });
        return order;
    } catch (error) {
        logger.error('Failed to create payment order', { error: error.message });
        throw error;
    }
};

/**
 * Verify payment signature
 * @param {Object} params - Verification parameters
 * @param {string} params.orderId - Razorpay order ID
 * @param {string} params.paymentId - Razorpay payment ID
 * @param {string} params.signature - Payment signature
 * @returns {boolean} Whether signature is valid
 */
const verifyPayment = ({ orderId, paymentId, signature }) => {
    if (!razorpay) {
        // Mock mode - accept all in development
        logger.warn('Mock payment verification - accepted without signature check');
        return true;
    }

    try {
        const body = orderId + '|' + paymentId;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isValid = expectedSignature === signature;

        if (isValid) {
            logger.info('Payment verified successfully', { paymentId });
        } else {
            logger.warn('Payment verification failed - invalid signature', { paymentId });
        }

        return isValid;
    } catch (error) {
        logger.error('Payment verification error', { error: error.message });
        return false;
    }
};

/**
 * Fetch payment details
 * @param {string} paymentId - Razorpay payment ID
 * @returns {Promise<Object>} Payment details
 */
const fetchPayment = async (paymentId) => {
    if (!razorpay) {
        return {
            id: paymentId,
            status: 'captured',
            mock: true,
        };
    }

    try {
        return await razorpay.payments.fetch(paymentId);
    } catch (error) {
        logger.error('Failed to fetch payment', { paymentId, error: error.message });
        throw error;
    }
};

/**
 * Initiate refund
 * @param {string} paymentId - Razorpay payment ID
 * @param {number} amount - Refund amount in paise
 * @param {string} reason - Refund reason
 * @returns {Promise<Object>} Refund details
 */
const initiateRefund = async (paymentId, amount, reason = 'Customer request') => {
    if (!razorpay) {
        return {
            id: `refund_mock_${Date.now()}`,
            payment_id: paymentId,
            amount,
            status: 'processed',
            mock: true,
        };
    }

    try {
        const refund = await razorpay.payments.refund(paymentId, {
            amount: Math.round(amount),
            notes: { reason },
        });

        logger.info('Refund initiated', { refundId: refund.id, paymentId, amount });
        return refund;
    } catch (error) {
        logger.error('Failed to initiate refund', { paymentId, error: error.message });
        throw error;
    }
};

/**
 * Generate payment link (for easy sharing)
 * @param {Object} options - Payment link options
 * @returns {Promise<Object>} Payment link details
 */
const generatePaymentLink = async ({ amount, description, customerName, customerEmail, customerPhone, reference }) => {
    if (!razorpay) {
        return {
            short_url: `https://mock-payment.example.com/pay/${reference}`,
            mock: true,
        };
    }

    try {
        const link = await razorpay.paymentLink.create({
            amount: Math.round(amount),
            currency: 'INR',
            description,
            customer: {
                name: customerName,
                email: customerEmail,
                contact: customerPhone,
            },
            reference_id: reference,
            callback_url: `${process.env.FRONTEND_URL}/payment/success`,
            callback_method: 'get',
        });

        logger.info('Payment link generated', { linkId: link.id, reference });
        return link;
    } catch (error) {
        logger.error('Failed to generate payment link', { error: error.message });
        throw error;
    }
};

/**
 * Get Razorpay public key for frontend
 * @returns {string|null}
 */
const getPublicKey = () => {
    return process.env.RAZORPAY_KEY_ID || null;
};

module.exports = {
    initializeRazorpay,
    isConfigured,
    createOrder,
    verifyPayment,
    fetchPayment,
    initiateRefund,
    generatePaymentLink,
    getPublicKey,
};
