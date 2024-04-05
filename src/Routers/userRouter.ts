import { Router } from 'express'
import { userValidators } from '../Validators/userValidators'
import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { userController } from '../Controllers/userController';
import { validate } from '../Validators/joiValid/validate'
export class customerRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter() {
        this.router.get('/', GlobalMiddleWare.authMiddleware(["admin"]), userController.getAllUser)
        this.router.get('/profile', GlobalMiddleWare.authMiddleware(["seller","buyer"]), userController.getUserProfile)
    }
    postRouter() {

        this.router.post('/register',userValidators.register(), GlobalMiddleWare.checkError, userController.register)
        this.router.post('/login', userValidators.login(), GlobalMiddleWare.checkError, userController.login)

    }
    patchRouter() {
        this.router.patch('/profile', GlobalMiddleWare.authMiddleware(["seller","buyer"]), userController.upadteUserProfile)
        this.router.patch('/verify', GlobalMiddleWare.checkError,userController.verify);
    }
    deleteRouter() {
        this.router.delete('/profile', GlobalMiddleWare.authMiddleware(["seller","buyer"]), userController.deleteUserProfile)
    }
}

export default new customerRouter().router