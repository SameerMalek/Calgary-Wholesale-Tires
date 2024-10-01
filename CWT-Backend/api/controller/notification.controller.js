import prisma from '../lib/prisma.js';

// Add a new notification
export const addNotification = async (req, res) => {
  const { user_id, type, message } = req.body;

  try {
    const notification = await prisma.notification.create({
      data: {
        user_id,
        type,
        message,
        status: 'unread', // Default status
      },
    });
    res.status(201).json({ message: 'Notification added successfully', notification });
  } catch (err) {
    res.status(500).json({ message: 'Error adding notification', error: err.message });
  }
};

// Get all notifications by user
export const getNotificationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await prisma.notification.findMany({
      where: { user_id: userId },
    });
    res.status(200).json({ notifications });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};

// Update notification status (mark as read/unread)
export const updateNotificationStatus = async (req, res) => {
  const { notificationId } = req.params;
  const { status } = req.body;

  try {
    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: { status },
    });
    res.status(200).json({ message: 'Notification updated successfully', notification: updatedNotification });
  } catch (err) {
    res.status(500).json({ message: 'Error updating notification', error: err.message });
  }
};
