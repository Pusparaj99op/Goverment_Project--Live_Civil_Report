/**
 * Socket.io Real-time Notification Service
 * Handles real-time updates for complaints, applications, and announcements
 */

const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('./env');
const logger = require('./logger');

let io = null;

// Connected users map: userId -> socketId
const connectedUsers = new Map();

/**
 * Initialize Socket.io with the HTTP server
 * @param {http.Server} server - HTTP server instance
 */
const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
    });

    // Authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;

            if (!token) {
                // Allow anonymous connections for public updates
                socket.user = null;
                return next();
            }

            const decoded = jwt.verify(token, config.JWT_SECRET);
            socket.user = { id: decoded.id };
            next();
        } catch (error) {
            logger.warn('Socket auth failed', { error: error.message });
            // Still allow connection, just without user context
            socket.user = null;
            next();
        }
    });

    // Connection handler
    io.on('connection', (socket) => {
        logger.info('Socket connected', {
            socketId: socket.id,
            userId: socket.user?.id
        });

        // Track authenticated user connections
        if (socket.user?.id) {
            connectedUsers.set(socket.user.id, socket.id);
            socket.join(`user:${socket.user.id}`);
        }

        // Join ward room if specified
        socket.on('join:ward', (ward) => {
            if (ward) {
                socket.join(`ward:${ward}`);
                logger.debug('Socket joined ward', { socketId: socket.id, ward });
            }
        });

        // Join role-based rooms
        socket.on('join:role', (role) => {
            if (['official', 'admin'].includes(role)) {
                socket.join(`role:${role}`);
                logger.debug('Socket joined role', { socketId: socket.id, role });
            }
        });

        // Leave rooms
        socket.on('leave:ward', (ward) => {
            socket.leave(`ward:${ward}`);
        });

        // Ping/pong for connection health
        socket.on('ping', () => {
            socket.emit('pong');
        });

        // Disconnect handler
        socket.on('disconnect', (reason) => {
            logger.info('Socket disconnected', {
                socketId: socket.id,
                userId: socket.user?.id,
                reason
            });

            if (socket.user?.id) {
                connectedUsers.delete(socket.user.id);
            }
        });
    });

    logger.info('Socket.io initialized');
    return io;
};

/**
 * Get the Socket.io instance
 * @returns {SocketIO.Server|null}
 */
const getIO = () => io;

// ===================
// Notification Helpers
// ===================

/**
 * Send notification to a specific user
 * @param {string} userId - User ID
 * @param {string} event - Event name
 * @param {Object} data - Event data
 */
const notifyUser = (userId, event, data) => {
    if (!io) return;

    io.to(`user:${userId}`).emit(event, {
        ...data,
        timestamp: new Date().toISOString(),
    });

    logger.debug('Notification sent to user', { userId, event });
};

/**
 * Send notification to all users in a ward
 * @param {string} ward - Ward number/name
 * @param {string} event - Event name
 * @param {Object} data - Event data
 */
const notifyWard = (ward, event, data) => {
    if (!io) return;

    io.to(`ward:${ward}`).emit(event, {
        ...data,
        timestamp: new Date().toISOString(),
    });

    logger.debug('Notification sent to ward', { ward, event });
};

/**
 * Send notification to all officials
 * @param {string} event - Event name
 * @param {Object} data - Event data
 */
const notifyOfficials = (event, data) => {
    if (!io) return;

    io.to('role:official').to('role:admin').emit(event, {
        ...data,
        timestamp: new Date().toISOString(),
    });

    logger.debug('Notification sent to officials', { event });
};

/**
 * Broadcast to all connected users
 * @param {string} event - Event name
 * @param {Object} data - Event data
 */
const broadcast = (event, data) => {
    if (!io) return;

    io.emit(event, {
        ...data,
        timestamp: new Date().toISOString(),
    });

    logger.debug('Broadcast sent', { event });
};

// ===================
// Event Emitters for Specific Actions
// ===================

/**
 * Notify about complaint status update
 */
const emitComplaintUpdate = (complaint) => {
    const data = {
        type: 'complaint:update',
        complaintId: complaint._id,
        status: complaint.status,
        priority: complaint.priority,
        message: `Your complaint status has been updated to: ${complaint.status}`,
    };

    // Notify the citizen who filed the complaint
    if (complaint.citizenId) {
        notifyUser(complaint.citizenId.toString(), 'complaint:update', data);
    }

    // Notify officials in the ward
    if (complaint.location?.ward) {
        notifyWard(complaint.location.ward, 'complaint:new', {
            type: 'complaint:ward',
            complaintId: complaint._id,
            complaintType: complaint.type,
            priority: complaint.priority,
        });
    }
};

/**
 * Notify about new complaint (for officials)
 */
const emitNewComplaint = (complaint) => {
    notifyOfficials('complaint:new', {
        type: 'complaint:new',
        complaintId: complaint._id,
        complaintType: complaint.type,
        ward: complaint.location?.ward,
        priority: complaint.priority,
        message: `New ${complaint.priority} priority complaint received`,
    });
};

/**
 * Notify about application status update
 */
const emitApplicationUpdate = (application) => {
    if (application.citizenId) {
        notifyUser(application.citizenId.toString(), 'application:update', {
            type: 'application:update',
            applicationId: application._id,
            status: application.status,
            applicationType: application.type,
            message: `Your application status has been updated to: ${application.status}`,
        });
    }
};

/**
 * Notify about payment confirmation
 */
const emitPaymentConfirmation = (payment) => {
    if (payment.citizenId) {
        notifyUser(payment.citizenId.toString(), 'payment:success', {
            type: 'payment:success',
            transactionId: payment.transactionId,
            amount: payment.totalAmount,
            receiptNumber: payment.receiptNumber,
            message: `Payment of ₹${payment.totalAmount} successful. Receipt: ${payment.receiptNumber}`,
        });
    }
};

/**
 * Send public announcement
 */
const emitAnnouncement = (announcement) => {
    broadcast('announcement', {
        type: 'announcement',
        title: announcement.title,
        message: announcement.message,
        priority: announcement.priority || 'normal',
        category: announcement.category,
    });
};

// ===================
// Statistics
// ===================

/**
 * Get connection statistics
 */
const getStats = () => ({
    connectedUsers: connectedUsers.size,
    totalConnections: io?.sockets?.sockets?.size || 0,
});

module.exports = {
    initializeSocket,
    getIO,
    notifyUser,
    notifyWard,
    notifyOfficials,
    broadcast,
    emitComplaintUpdate,
    emitNewComplaint,
    emitApplicationUpdate,
    emitPaymentConfirmation,
    emitAnnouncement,
    getStats,
};
