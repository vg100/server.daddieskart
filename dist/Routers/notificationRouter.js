"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const notificationController_1 = require("../Controllers/notificationController");
class notificationRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), notificationController_1.notificationController.getAllNotification);
        this.router.get('/unread', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), notificationController_1.notificationController.getUnreadlNotification);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), notificationController_1.notificationController.createNotification);
    }
    patchRouter() {
        this.router.patch('/:id/read', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), notificationController_1.notificationController.markaNotificationAsRead);
    }
    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), notificationController_1.notificationController.deleteNotification);
    }
}
exports.notificationRouter = notificationRouter;
exports.default = new notificationRouter().router;
