"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
var Notification = /** @class */ (function () {
    function Notification(date, title, content, userId, notificationId) {
        this.date = date;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.notificationId = notificationId;
    }
    Notification.prototype.setNotificationId = function (notificationId) {
        this.notificationId = notificationId;
    };
    Notification.prototype.getNotificationId = function () {
        return this.notificationId;
    };
    Notification.prototype.getDate = function () {
        return this.date;
    };
    Notification.prototype.getTitle = function () {
        return this.title;
    };
    Notification.prototype.getContent = function () {
        return this.content;
    };
    Notification.prototype.getUserId = function () {
        return this.userId;
    };
    return Notification;
}());
exports.Notification = Notification;
