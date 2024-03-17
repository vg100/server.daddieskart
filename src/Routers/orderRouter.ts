import { Router } from "express";
import { orderController } from "../Controllers/orderController";
import { GlobalMiddleWare } from "../GlobalMiddleWare/GlobalMiddleWare";


export class orderRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter() {
        this.router.get('/', GlobalMiddleWare.authMiddleware(['seller']),orderController.getAllOrders)
        this.router.get('/:id', GlobalMiddleWare.authMiddleware(['seller']),orderController.getOrdersById)
        this.router.get('/user/:userId', GlobalMiddleWare.authMiddleware(['buyer']),orderController.getOrdersByUserId)
        this.router.get('/status/:status', GlobalMiddleWare.authMiddleware(['seller']),orderController.getOrdersByStatus)


    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare.authMiddleware(['buyer']), orderController.createOrder)
    }

    patchRouter(){
        this.router.patch('/:id', GlobalMiddleWare.authMiddleware(['seller']), orderController.updateOrder)
    }

    deleteRouter(){
        this.router.delete('/:id', GlobalMiddleWare.authMiddleware(['seller']), orderController.deleteOrder)
    }

}

export default new orderRouter().router