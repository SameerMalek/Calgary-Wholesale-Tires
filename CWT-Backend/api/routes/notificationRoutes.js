import express from 'express';
import {
  addNotification,
  getNotificationsByUser,
  updateNotificationStatus,
} from '../controller/notification.controller.js';

const router = express.Router();

// Add notification
router.post('/notification', addNotification);

// Get all notifications by user
router.get('/user/:userId/notifications', getNotificationsByUser);

// Update notification status
router.put('/notification/:notificationId/status', updateNotificationStatus);

export default router;
