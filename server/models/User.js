const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Family Member Sub-schema
const familyMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    relation: {
        type: String,
        required: true,
        enum: ['Self', 'Spouse', 'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Grandfather', 'Grandmother', 'Uncle', 'Aunt', 'Other']
    },
    age: Number,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    occupation: String,
    profileImage: String,  // Base64
    idProofType: String,
    idProofNumber: String,
    phone: String
});

const userSchema = new mongoose.Schema({
    // Basic Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    role: { type: String, enum: ['citizen', 'admin', 'official'], default: 'citizen' },

    // Profile Image (Base64)
    profileImage: String,

    // Ward & ID
    ward: { type: String, default: 'Ward 1' },
    idProofType: { type: String, required: true },
    idProofNumber: { type: String, required: true },

    // Household Info
    houseName: String,  // Optional - "Gajbhiye Niwas"

    // Address
    address: {
        line1: String,
        line2: String,
        landmark: String,
        pincode: String,
        mapLocation: {
            lat: Number,
            lng: Number
        }
    },

    // Family Members
    familyMembers: [familyMemberSchema],
    totalFamilyMembers: { type: Number, default: 1 },

    // Utility Connections
    electricityMeterNo: String,
    waterMeterNo: String,

    // Business Details
    hasBusiness: { type: Boolean, default: false },
    business: {
        shopName: String,
        natureOfWork: String,
        gstNumber: String,
        tradeLicenseNo: String,
        shopAddress: String
    },

    // Profile Completion
    profileCompleted: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
