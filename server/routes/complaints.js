const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect, officialOrAdmin } = require('../middleware/auth');

// AI Priority Assignment (mock - to be replaced with actual ML model)
const assignAIPriority = (complaint) => {
    let score = 50; // base score
    let reasons = [];

    // Critical types get higher priority
    const criticalTypes = ['water_supply', 'drainage', 'streetlight'];
    if (criticalTypes.includes(complaint.type)) {
        score += 20;
        reasons.push('Critical infrastructure issue');
    }

    // Keyword analysis in description
    const urgentKeywords = ['urgent', 'emergency', 'danger', 'flooding', 'accident', 'health hazard'];
    const lowKeywords = ['minor', 'small', 'cosmetic'];

    const desc = complaint.description.toLowerCase();
    urgentKeywords.forEach(kw => {
        if (desc.includes(kw)) {
            score += 15;
            reasons.push(`Contains urgent keyword: ${kw}`);
        }
    });
    lowKeywords.forEach(kw => {
        if (desc.includes(kw)) {
            score -= 10;
            reasons.push(`Contains low-priority keyword: ${kw}`);
        }
    });

    // Priority mapping
    let priority = 'medium';
    if (score >= 80) priority = 'critical';
    else if (score >= 65) priority = 'high';
    else if (score <= 30) priority = 'low';

    return {
        score,
        reason: reasons.join('; ') || 'Standard priority assessment',
        priority,
        assignedAt: new Date()
    };
};

// @route   POST /api/complaints
// @desc    File a new complaint
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { type, subType, description, location, images } = req.body;

        const complaintData = {
            citizenId: req.user._id,
            type,
            subType,
            description,
            location: {
                ...location,
                ward: location.ward || req.user.ward
            },
            images
        };

        // AI priority assignment
        const aiAssessment = assignAIPriority(complaintData);
        complaintData.priority = aiAssessment.priority;
        complaintData.aiPriority = aiAssessment;

        const complaint = await Complaint.create(complaintData);

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/complaints
// @desc    Get current user's complaints
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const complaints = await Complaint.find({ citizenId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/complaints/:id
// @desc    Get single complaint by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id)
            .populate('citizenId', 'name email ward')
            .populate('assignedTo', 'name email');

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        if (req.user.role === 'citizen' && complaint.citizenId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/complaints/ward/:wardNumber
// @desc    Get complaints by ward (officials only)
// @access  Private (Officials/Admins)
router.get('/ward/:wardNumber', protect, async (req, res) => {
    try {
        if (req.user.role === 'citizen') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const complaints = await Complaint.find({ 'location.ward': req.params.wardNumber })
            .populate('citizenId', 'name email')
            .sort({ createdAt: -1 });

        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PATCH /api/complaints/:id
// @desc    Update complaint status (officials only)
// @access  Private (Officials/Admins)
router.patch('/:id', protect, async (req, res) => {
    try {
        if (req.user.role === 'citizen') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { status, notes, actionTaken } = req.body;
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Add update to history
        complaint.updates.push({
            status,
            notes,
            by: req.user._id
        });

        complaint.status = status;

        if (!complaint.assignedTo) {
            complaint.assignedTo = req.user._id;
        }

        if (status === 'resolved') {
            complaint.resolution = {
                notes,
                resolvedBy: req.user._id,
                resolvedAt: new Date(),
                actionTaken
            };
        }

        await complaint.save();
        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/complaints/:id/feedback
// @desc    Submit citizen feedback on resolved complaint
// @access  Private
router.post('/:id/feedback', protect, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        if (complaint.citizenId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (complaint.status !== 'resolved') {
            return res.status(400).json({ message: 'Can only provide feedback on resolved complaints' });
        }

        complaint.resolution.citizenFeedback = {
            rating,
            comment,
            submittedAt: new Date()
        };

        complaint.status = 'closed';
        await complaint.save();

        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/complaints/stats/summary
// @desc    Get complaint statistics
// @access  Private (Officials/Admins)
router.get('/stats/summary', protect, async (req, res) => {
    try {
        if (req.user.role === 'citizen') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const statusStats = await Complaint.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const typeStats = await Complaint.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const wardStats = await Complaint.aggregate([
            { $group: { _id: '$location.ward', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const avgResolutionTime = await Complaint.aggregate([
            { $match: { status: { $in: ['resolved', 'closed'] } } },
            {
                $project: {
                    resolutionTime: {
                        $subtract: ['$resolution.resolvedAt', '$createdAt']
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    avgTime: { $avg: '$resolutionTime' }
                }
            }
        ]);

        res.json({
            statusStats,
            typeStats,
            wardStats,
            avgResolutionTimeHours: avgResolutionTime[0]
                ? Math.round(avgResolutionTime[0].avgTime / (1000 * 60 * 60))
                : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
