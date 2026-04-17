// utils/sendNotification.js
import admin from '../config/message.js'

export const sendNotificationforlogin = async (token, message) => {
  try {
    const payload = {
      token: token,
      notification: {
        title: "Welcome 🎉",
        body: message,
      },
    };

    await admin.messaging().send(payload);
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

