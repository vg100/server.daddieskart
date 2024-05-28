"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Router = void 0;
const express_1 = require("express");
const web3Conroller_1 = require("../Controllers/web3Conroller");
const webMiddleWare_1 = require("../GlobalMiddleWare/webMiddleWare");
class web3Router {
    constructor() {
        this.router = express_1.Router();
        //workerRouters
        this.workerGetRouter();
        this.workerPostRouter();
        //userRouters
        this.userGetRouter();
        this.userPostRouter();
    }
    //workerRouters
    workerGetRouter() {
        this.router.get("/worker/balance", webMiddleWare_1.WebMiddleWare.workerMiddleware, web3Conroller_1.workersController.balance);
        this.router.get("/worker/nextTask", webMiddleWare_1.WebMiddleWare.workerMiddleware, web3Conroller_1.workersController.nextTask);
    }
    workerPostRouter() {
        this.router.post("/worker/payout", webMiddleWare_1.WebMiddleWare.workerMiddleware, web3Conroller_1.workersController.payout);
        this.router.post("/worker/submission", webMiddleWare_1.WebMiddleWare.workerMiddleware, web3Conroller_1.workersController.dynamicHandler);
        this.router.post("/worker/signin", webMiddleWare_1.WebMiddleWare.workerMiddleware, web3Conroller_1.workersController.dynamicHandler);
    }
    //userRouters
    userGetRouter() {
        this.router.get("/user/task", webMiddleWare_1.WebMiddleWare.authMiddleware, web3Conroller_1.usersController.dynamicHandler);
        this.router.get("/presignedUrl", webMiddleWare_1.WebMiddleWare.authMiddleware, web3Conroller_1.usersController.dynamicHandler);
    }
    userPostRouter() {
        this.router.post("/user/task", webMiddleWare_1.WebMiddleWare.authMiddleware, web3Conroller_1.usersController.dynamicHandler);
        this.router.post("/signin", web3Conroller_1.usersController.dynamicHandler);
    }
}
exports.web3Router = web3Router;
exports.default = new web3Router().router;
