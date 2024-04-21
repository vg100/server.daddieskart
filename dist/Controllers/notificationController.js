"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
const notification_1 = require("../Models/notification");
class notificationController {
    static createNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = new notification_1.default(req.body);
                const newNotification = yield notification.save();
                res.status(201).json(newNotification);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield notification_1.default.find();
                res.json(notifications);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getUnreadlNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unreadNotifications = yield notification_1.default.find({ status: 'unread' });
                res.json(unreadNotifications);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static markaNotificationAsRead(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield notification_1.default.findById(req.params.id);
                if (!notification) {
                    return res.status(404).json({ message: 'Notification not found' });
                }
                notification.status = 'read';
                yield notification.save();
                res.json({ message: 'Notification marked as read' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield notification_1.default.findById(req.params.id);
                if (!notification) {
                    return res.status(404).json({ message: 'Notification not found' });
                }
                yield notification.remove();
                res.json({ message: 'Notification deleted' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.notificationController = notificationController;
