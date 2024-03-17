import { Router } from "express";

import { GlobalMiddleWare } from "../GlobalMiddleWare/GlobalMiddleWare";
import { transactionController } from "../Controllers/transactionController";


export class transactionRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
    }

    getRouter() {
        this.router.get('/', GlobalMiddleWare.authMiddleware(['admin']), transactionController.getAllTransaction)
        this.router.get('/:type', GlobalMiddleWare.authMiddleware(['admin']), transactionController.getTransactionByType)


    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare.authMiddleware(['admin']), transactionController.createTransaction)
    }

}

export default new transactionRouter().router