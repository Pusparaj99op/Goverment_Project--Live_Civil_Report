const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    citizenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            'birth_certificate',
            'death_certificate',
            'marriage_certificate',
            'property_tax',
            'water_bill',
            'trade_license',
            'building_permission',
            'noc',
            'domicile',
            'income_certificate'
        ]
    },
    applicationNumber: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    documents: [{
        name: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now }
    }],
    formData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    currentStep: {
        type: Number,
        default: 1
    },
    totalSteps: {
        type: Number,
        default: 3
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ward: {
        type: String,
        required: true
    },
    slaDeadline: {
        type: Date
    },
    remarks: [{
        text: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        at: { type: Date, default: Date.now }
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: Date
});

// Auto-generate application number
applicationSchema.pre('save', async function (next) {
    if (!this.applicationNumber) {
        const count = await mongoose.model('Application').countDocuments();
        const year = new Date().getFullYear();
        this.applicationNumber = `UNP-${year}-${String(count + 1).padStart(6, '0')}`;
    }
    this.updatedAt = new Date();
    next();
});

// Calculate SLA deadline based on type (in days)
applicationSchema.pre('save', function (next) {
    if (!this.slaDeadline) {
        const slaDays = {
            'birth_certificate': 7,
            'death_certificate': 7,
            'marriage_certificate': 15,
            'property_tax': 3,
            'water_bill': 1,
            'trade_license': 30,
            'building_permission': 60,
            'noc': 15,
            'domicile': 21,
            'income_certificate': 14
        };
        const days = slaDays[this.type] || 15;
        this.slaDeadline = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }
    next();
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
