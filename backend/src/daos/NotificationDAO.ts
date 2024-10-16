import Notification from "../schemas/notificationS";
import { Notification as NotificationModel } from "../models/Notification";

class NotificationDAO {
  constructor() {}

  public async registerNotification(notificationToRegister: NotificationModel) {
    const notification = new Notification({
      userRef: notificationToRegister.getUserId(),
      date: notificationToRegister.getDate(),
      title: notificationToRegister.getTitle(),
      content: notificationToRegister.getContent(),
      isRead: false,
    });

    return await notification.save();
  }

  public async markAsRead(userId: string) {
    return await Notification.updateMany(
      { userRef: userId },
      { $set: { isRead: true } }
    );
  }

  public async getUserNotifications(userId: string) {
    return await Notification.find({ userRef: userId }).sort({ date: -1 });
  }

  public async unreadAmount(userId: string) {
    return await Notification.countDocuments({
      userRef: userId,
      isRead: false,
    });
  }
}

export { NotificationDAO };
