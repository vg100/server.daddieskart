import Notification from "../Models/notification";

export class notificationController{
 static async createNotification(req,res,next){
    try {
        const notification = new Notification(req.body);
        const newNotification = await notification.save();
        res.status(201).json(newNotification);
    } catch (e) {
        next(e);
    }
 }

 static async getAllNotification(req,res,next){
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (e) {
        next(e);
    }
 }

 static async getUnreadlNotification(req,res,next){
    try {
        const unreadNotifications = await Notification.find({ status: 'unread' });
        res.json(unreadNotifications);
    } catch (e) {
        next(e);
    }
 }

 static async markaNotificationAsRead(req,res,next){
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
          return res.status(404).json({ message: 'Notification not found' });
        }
        notification.status = 'read';
        await notification.save();
        res.json({ message: 'Notification marked as read' });
    } catch (e) {
        next(e);
    }
 }

 static async deleteNotification(req,res,next){
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
          return res.status(404).json({ message: 'Notification not found' });
        }
        await notification.remove();
        res.json({ message: 'Notification deleted' });
    } catch (e) {
        next(e);
    }
 }

}