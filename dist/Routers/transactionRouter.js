"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const transactionController_1 = require("../Controllers/transactionController");
class transactionRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
    }
    getRouter() {
        this.router.get('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), transactionController_1.transactionController.getAllTransaction);
        this.router.get('/:type', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), transactionController_1.transactionController.getTransactionByType);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), transactionController_1.transactionController.createTransaction);
    }
}
exports.transactionRouter = transactionRouter;
exports.default = new transactionRouter().router;
