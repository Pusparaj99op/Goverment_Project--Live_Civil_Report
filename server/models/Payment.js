const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    citizenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactionId: {
        type: String,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            'property_tax',
            'water_bill',
            'trade_license',
            'building_fee',
            'advertisement_tax',
            'penalty',
            'miscellaneous'
        ]
    },
    referenceNumber: String, // Property ID, Water Connection ID, etc.
    amount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    penalty: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['initiated', 'pending', 'success', 'failed', 'refunded'],
        default: 'initiated'
    },
    paymentMethod: {
        type: String,
        enum: ['upi', 'netbanking', 'card', 'wallet', 'cash', 'cheque'],
        default: 'upi'
    },
    paymentGateway: {
        type: String,
        enum: ['razorpay', 'paytm', 'phonepe', 'bbps', 'offline'],
        default: 'razorpay'
    },
    gatewayResponse: {
        orderId: String,
        paymentId: String,
        signature: String,
        rawResponse: mongoose.Schema.Types.Mixed
    },
    billDetails: {
        billNumber: String,
        billDate: Date,
        dueDate: Date,
        periodFrom: Date,
        periodTo: Date,
        description: String
    },
    ward: String,
    receiptNumber: String,
    receiptUrl: String,
    initiatedAt: {
        type: Date,
        default: Date.now
    },
    paidAt: Date,
    refundedAt: Date,
    refundReason: String
});

// Auto-generate transaction ID
paymentSchema.pre('save', async function (next) {
    if (!this.transactionId) {
        const date = new Date();
        const timestamp = date.getTime().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.transactionId = `TXN${timestamp}${random}`;
    }
    next();
});

// Generate receipt number on successful payment
paymentSchema.pre('save', async function (next) {
    if (this.status === 'success' && !this.receiptNumber) {
        const count = await mongoose.model('Payment').countDocuments({ status: 'success' });
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        this.receiptNumber = `RCP-${year}${month}-${String(count + 1).padStart(6, '0')}`;
        this.paidAt = new Date();
    }
    next();
});

// Calculate total amount
paymentSchema.pre('save', function (next) {
    if (this.isModified('amount') || this.isModified('discount') || this.isModified('penalty')) {
        this.totalAmount = this.amount - this.discount + this.penalty;
    }
    next();
});

// Static methods for analytics
paymentSchema.statics.getWardWiseCollection = async function (startDate, endDate) {
    return this.aggregate([
        {
            $match: {
                status: 'success',
                paidAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: '$ward',
                totalCollection: { $sum: '$totalAmount' },
                count: { $sum: 1 }
            }
        },
        { $sort: { totalCollection: -1 } }
    ]);
};

paymentSchema.statics.getTypeWiseCollection = async function (startDate, endDate) {
    return this.aggregate([
        {
            $match: {
                status: 'success',
                paidAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: '$type',
                totalCollection: { $sum: '$totalAmount' },
                count: { $sum: 1 }
            }
        },
        { $sort: { totalCollection: -1 } }
    ]);
};

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
