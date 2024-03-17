import { Router } from "express";

import { GlobalMiddleWare } from "../GlobalMiddleWare/GlobalMiddleWare";

import { notificationController } from "../Controllers/notificationController";


export class notificationRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter()
        this.deleteRouter()
    }

    getRouter() {
        this.router.get('/', GlobalMiddleWare.authMiddleware(['admin']),notificationController.getAllNotification)
        this.router.get('/unread', GlobalMiddleWare.authMiddleware(['admin']),notificationController.getUnreadlNotification)
       
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare.authMiddleware(['admin']), notificationController.createNotification)
    }

    patchRouter() {
        this.router.patch('/:id/read',GlobalMiddleWare.authMiddleware(['admin']),notificationController.markaNotificationAsRead)
    }

    deleteRouter() {
        this.router.delete('/:id',GlobalMiddleWare.authMiddleware(['admin']),notificationController.deleteNotification)
    }
}

export default new notificationRouter().router