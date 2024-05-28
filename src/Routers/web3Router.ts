import { NextFunction, Router } from 'express'
import { userValidators } from '../Validators/userValidators'
import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';

import { usersController,workersController } from '../Controllers/web3Conroller';
import { WebMiddleWare } from '../GlobalMiddleWare/webMiddleWare';
export class web3Router {
    router: Router;
    constructor() {
        this.router = Router();
        //workerRouters
        this.workerGetRouter();
        this.workerPostRouter();

        //userRouters
        this.userGetRouter();
        this.userPostRouter();
    }
    //workerRouters
    workerGetRouter() {
        this.router.get("/worker/balance",WebMiddleWare.workerMiddleware,workersController.balance)
        this.router.get("/worker/nextTask",WebMiddleWare.workerMiddleware,workersController.nextTask)
    }
    workerPostRouter() {
        this.router.post("/worker/payout", WebMiddleWare.workerMiddleware,workersController.payout)
        this.router.post("/worker/submission",WebMiddleWare.workerMiddleware, workersController.dynamicHandler)
        this.router.post("/worker/signin",WebMiddleWare.workerMiddleware, workersController.dynamicHandler)
    }


    //userRouters
    userGetRouter() {
        this.router.get("/user/task",WebMiddleWare.authMiddleware,usersController.dynamicHandler)
        this.router.get("/presignedUrl",WebMiddleWare.authMiddleware,usersController.dynamicHandler)
    }
    userPostRouter() {
        this.router.post("/user/task",WebMiddleWare.authMiddleware,usersController.dynamicHandler)
        this.router.post("/signin",usersController.dynamicHandler)
    }

}

export default new web3Router().router