const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect: auth } = require('../middleware/auth');

// Calculate profile completion percentage
const calculateCompletion = (user) => {
    let completed = 0;
    let total = 10;

    if (user.name) completed++;
    if (user.email) completed++;
    if (user.phone) completed++;
    if (user.profileImage) completed++;
    if (user.address?.line1) completed++;
    if (user.address?.mapLocation?.lat) completed++;
    if (user.familyMembers?.length > 0) completed++;
    if (user.electricityMeterNo || user.waterMeterNo) completed++;
    if (user.hasBusiness && user.business?.shopName) completed++;
    if (user.idProofNumber) completed++;

    return Math.round((completed / total) * 100);
};

// @route   GET /api/profile
// @desc    Get current user's full profile
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        const completion = calculateCompletion(user);

        res.json({
            ...user.toObject(),
            profileCompletion: completion
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/profile
// @desc    Update profile details
// @access  Private
router.put('/', auth, async (req, res) => {
    try {
        const allowedUpdates = [
            'name', 'phone', 'houseName', 'ward',
            'address', 'electricityMeterNo', 'waterMeterNo',
            'totalFamilyMembers', 'hasBusiness', 'business'
        ];

        const updates = {};
        for (const key of allowedUpdates) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }
        updates.updatedAt = new Date();

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        const completion = calculateCompletion(user);

        res.json({
            message: 'Profile updated successfully',
            user: { ...user.toObject(), profileCompletion: completion }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/profile/image
// @desc    Upload profile image (Base64)
// @access  Private
router.post('/image', auth, async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ message: 'Image data is required' });
        }

        // Validate Base64 format
        if (!image.startsWith('data:image/')) {
            return res.status(400).json({ message: 'Invalid image format' });
        }

        // Check size (max 500KB base64)
        if (image.length > 700000) {
            return res.status(400).json({ message: 'Image too large. Please use a smaller image (max 500KB)' });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { profileImage: image, updatedAt: new Date() } },
            { new: true }
        ).select('-password');

        res.json({
            message: 'Profile image updated successfully',
            profileImage: user.profileImage
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/profile/family-member
// @desc    Add a family member
// @access  Private
router.post('/family-member', auth, async (req, res) => {
    try {
        const { name, relation, age, gender, occupation, phone, idProofType, idProofNumber, profileImage } = req.body;

        if (!name || !relation) {
            return res.status(400).json({ message: 'Name and relation are required' });
        }

        const newMember = {
            name,
            relation,
            age,
            gender,
            occupation,
            phone,
            idProofType,
            idProofNumber,
            profileImage
        };

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { familyMembers: newMember },
                $inc: { totalFamilyMembers: 1 },
                $set: { updatedAt: new Date() }
            },
            { new: true }
        ).select('-password');

        res.status(201).json({
            message: 'Family member added successfully',
            familyMembers: user.familyMembers,
            totalFamilyMembers: user.totalFamilyMembers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/profile/family-member/:id
// @desc    Update a family member
// @access  Private
router.put('/family-member/:id', auth, async (req, res) => {
    try {
        const memberId = req.params.id;
        const updates = req.body;

        const user = await User.findOneAndUpdate(
            { _id: req.user._id, 'familyMembers._id': memberId },
            {
                $set: {
                    'familyMembers.$': { ...updates, _id: memberId },
                    updatedAt: new Date()
                }
            },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Family member not found' });
        }

        res.json({
            message: 'Family member updated successfully',
            familyMembers: user.familyMembers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/profile/family-member/:id
// @desc    Remove a family member
// @access  Private
router.delete('/family-member/:id', auth, async (req, res) => {
    try {
        const memberId = req.params.id;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: { familyMembers: { _id: memberId } },
                $inc: { totalFamilyMembers: -1 },
                $set: { updatedAt: new Date() }
            },
            { new: true }
        ).select('-password');

        res.json({
            message: 'Family member removed successfully',
            familyMembers: user.familyMembers,
            totalFamilyMembers: Math.max(1, user.totalFamilyMembers)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/profile/business
// @desc    Update business details
// @access  Private
router.put('/business', auth, async (req, res) => {
    try {
        const { hasBusiness, shopName, natureOfWork, gstNumber, tradeLicenseNo, shopAddress } = req.body;

        const updates = {
            hasBusiness: hasBusiness || false,
            business: hasBusiness ? {
                shopName,
                natureOfWork,
                gstNumber,
                tradeLicenseNo,
                shopAddress
            } : {},
            updatedAt: new Date()
        };

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true }
        ).select('-password');

        res.json({
            message: 'Business details updated successfully',
            hasBusiness: user.hasBusiness,
            business: user.business
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/profile/location
// @desc    Update map location
// @access  Private
router.put('/location', auth, async (req, res) => {
    try {
        const { lat, lng } = req.body;

        if (lat === undefined || lng === undefined) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    'address.mapLocation': { lat, lng },
                    updatedAt: new Date()
                }
            },
            { new: true }
        ).select('-password');

        res.json({
            message: 'Location updated successfully',
            mapLocation: user.address?.mapLocation
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
