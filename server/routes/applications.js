const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect, officialOrAdmin } = require('../middleware/auth');

// @route   POST /api/applications
// @desc    Submit a new application
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { type, documents, formData } = req.body;

        const application = await Application.create({
            citizenId: req.user._id,
            type,
            documents,
            formData,
            ward: req.user.ward
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/applications
// @desc    Get current user's applications
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const applications = await Application.find({ citizenId: req.user._id })
            .sort({ submittedAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/applications/:id
// @desc    Get single application by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('citizenId', 'name email ward')
            .populate('assignedTo', 'name email');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Citizens can only view their own applications
        if (req.user.role === 'citizen' && application.citizenId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/applications/ward/:wardNumber
// @desc    Get applications by ward (officials only)
// @access  Private (Officials/Admins)
router.get('/ward/:wardNumber', protect, async (req, res) => {
    try {
        if (req.user.role === 'citizen') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const applications = await Application.find({ ward: req.params.wardNumber })
            .populate('citizenId', 'name email')
            .sort({ submittedAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PATCH /api/applications/:id/status
// @desc    Update application status (officials only)
// @access  Private (Officials/Admins)
router.patch('/:id/status', protect, async (req, res) => {
    try {
        if (req.user.role === 'citizen') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { status, remarks, currentStep } = req.body;
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status || application.status;
        if (currentStep) application.currentStep = currentStep;
        if (status === 'completed') application.completedAt = new Date();

        if (remarks) {
            application.remarks.push({
                text: remarks,
                by: req.user._id
            });
        }

        if (!application.assignedTo) {
            application.assignedTo = req.user._id;
        }

        await application.save();
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/applications/stats/summary
// @desc    Get application statistics
// @access  Private (Officials/Admins)
router.get('/stats/summary', protect, async (req, res) => {
    try {
        if (req.user.role === 'citizen') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const stats = await Application.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const typeStats = await Application.aggregate([
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.json({ statusStats: stats, typeStats });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
