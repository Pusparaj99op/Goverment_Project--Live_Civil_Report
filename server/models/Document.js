const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    documentType: {
        type: String,
        required: true,
        enum: ['Aadhar Card', 'Voter ID', 'Ration Card', 'Property Tax Receipt', 'Electricity Bill', 'Other']
    },
    documentNumber: {
        type: String,
        required: true,
        trim: true
    },
    extractedData: {
        fullText: String,
        name: String,
        address: String,
        confidence: String
    },
    filePath: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    verifiedAt: {
        type: Date
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Indexes
documentSchema.index({ user: 1, documentType: 1 });
documentSchema.index({ documentNumber: 1 });

module.exports = mongoose.model('Document', documentSchema);
