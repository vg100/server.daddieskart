"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orderController_1 = require("../Controllers/orderController");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
class orderRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller']), orderController_1.orderController.getAllOrders);
        this.router.get('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller']), orderController_1.orderController.getOrdersById);
        this.router.get('/user/:userId', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), orderController_1.orderController.getOrdersByUserId);
        this.router.get('/status/:status', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller']), orderController_1.orderController.getOrdersByStatus);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), orderController_1.orderController.createOrder);
    }
    patchRouter() {
        this.router.patch('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller']), orderController_1.orderController.updateOrder);
    }
    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller']), orderController_1.orderController.deleteOrder);
    }
}
exports.orderRouter = orderRouter;
exports.default = new orderRouter().router;
