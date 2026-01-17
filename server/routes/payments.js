const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { protect, officialOrAdmin } = require('../middleware/auth');

// Calculate early payment discount
const calculateDiscount = (dueDate, amount) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysEarly = Math.floor((due - today) / (1000 * 60 * 60 * 24));

    if (daysEarly >= 30) return amount * 0.05; // 5% discount
    if (daysEarly >= 15) return amount * 0.03; // 3% discount
    if (daysEarly >= 7) return amount * 0.01;  // 1% discount
    return 0;
};

// Calculate late payment penalty
const calculatePenalty = (dueDate, amount) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysLate = Math.floor((today - due) / (1000 * 60 * 60 * 24));

    if (daysLate <= 0) return 0;
    if (daysLate <= 30) return amount * 0.02;  // 2% penalty
    if (daysLate <= 60) return amount * 0.05;  // 5% penalty
    if (daysLate <= 90) return amount * 0.10;  // 10% penalty
    return amount * 0.18; // 18% max penalty
};

// @route   POST /api/payments/initiate
// @desc    Initiate a new payment
// @access  Private
router.post('/initiate', protect, async (req, res) => {
    try {
        const { type, referenceNumber, amount, billDetails, paymentMethod } = req.body;

        const discount = calculateDiscount(billDetails?.dueDate, amount);
        const penalty = calculatePenalty(billDetails?.dueDate, amount);
        const totalAmount = amount - discount + penalty;

        const payment = await Payment.create({
            citizenId: req.user._id,
            type,
            referenceNumber,
            amount,
            discount,
            penalty,
            totalAmount,
            billDetails,
            paymentMethod: paymentMethod || 'upi',
            ward: req.user.ward
        });

        // In production, this would integrate with actual payment gateway
        // For now, return mock gateway order
        res.status(201).json({
            payment,
            gatewayOrder: {
                orderId: `order_${payment.transactionId}`,
                amount: totalAmount * 100, // in paise
                currency: 'INR',
                notes: {
                    type: payment.type,
                    citizenId: req.user._id.toString()
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/payments/verify
// @desc    Verify and complete payment
// @access  Private
router.post('/verify', protect, async (req, res) => {
    try {
        const { transactionId, gatewayPaymentId, gatewayOrderId, signature } = req.body;

        const payment = await Payment.findOne({ transactionId });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (payment.citizenId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // In production, verify signature with payment gateway
        // For mock, we'll accept any verification

        payment.status = 'success';
        payment.gatewayResponse = {
            orderId: gatewayOrderId,
            paymentId: gatewayPaymentId,
            signature
        };

        await payment.save();

        res.json({
            success: true,
            payment,
            receiptNumber: payment.receiptNumber,
            message: 'Payment successful! Receipt generated.'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/payments/fail
// @desc    Mark payment as failed
// @access  Private
router.post('/fail', protect, async (req, res) => {
    try {
        const { transactionId, reason } = req.body;

        const payment = await Payment.findOne({ transactionId });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.status = 'failed';
        payment.gatewayResponse = { error: reason };
        await payment.save();

        res.json({ success: false, payment, message: 'Payment failed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/payments/history
// @desc    Get current user's payment history
// @access  Private
router.get('/history', protect, async (req, res) => {
    try {
        const { type, status, limit = 20, page = 1 } = req.query;
        const query = { citizenId: req.user._id };

        if (type) query.type = type;
        if (status) query.status = status;

        const payments = await Payment.find(query)
            .sort({ initiatedAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Payment.countDocuments(query);

        res.json({
            payments,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/payments/:receiptNumber/receipt
// @desc    Get payment receipt
// @access  Private
router.get('/:receiptNumber/receipt', protect, async (req, res) => {
    try {
        const payment = await Payment.findOne({ receiptNumber: req.params.receiptNumber })
            .populate('citizenId', 'name email ward idProofNumber');

        if (!payment) {
            return res.status(404).json({ message: 'Receipt not found' });
        }

        if (req.user.role === 'citizen' && payment.citizenId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json({
            receiptNumber: payment.receiptNumber,
            transactionId: payment.transactionId,
            citizen: payment.citizenId,
            type: payment.type,
            referenceNumber: payment.referenceNumber,
            amount: payment.amount,
            discount: payment.discount,
            penalty: payment.penalty,
            totalAmount: payment.totalAmount,
            paymentMethod: payment.paymentMethod,
            paidAt: payment.paidAt,
            billDetails: payment.billDetails
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/payments/stats/collection
// @desc    Get collection statistics (officials only)
// @access  Private (Officials/Admins)
router.get('/stats/collection', protect, async (req, res) => {
    try {
        if (req.user.role === 'citizen') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { startDate, endDate } = req.query;
        const start = startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
        const end = endDate ? new Date(endDate) : new Date();

        const wardCollection = await Payment.getWardWiseCollection(start, end);
        const typeCollection = await Payment.getTypeWiseCollection(start, end);

        const totalCollection = await Payment.aggregate([
            {
                $match: {
                    status: 'success',
                    paidAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalAmount' },
                    count: { $sum: 1 },
                    avgAmount: { $avg: '$totalAmount' }
                }
            }
        ]);

        const methodStats = await Payment.aggregate([
            {
                $match: {
                    status: 'success',
                    paidAt: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: '$paymentMethod',
                    total: { $sum: '$totalAmount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            period: { start, end },
            summary: totalCollection[0] || { total: 0, count: 0, avgAmount: 0 },
            wardCollection,
            typeCollection,
            methodStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
