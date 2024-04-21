import { Router } from 'express'
import { userValidators } from '../Validators/userValidators'
import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { userController } from '../Controllers/userController';
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
        this.router.get('/', GlobalMiddleWare.authMiddleware(["admin","buyer"]),userController.getAllUser)
        this.router.get('/profile',GlobalMiddleWare.authMiddleware(["buyer"]),userController.getUserProfile)
    }
    postRouter() {

        this.router.post('/register',userValidators.register(), GlobalMiddleWare.checkError, userController.register)
        this.router.post('/login', userValidators.login(), GlobalMiddleWare.checkError, userController.login)

    }
    patchRouter() {
        this.router.patch('/:id',
        GlobalMiddleWare.authMiddleware(["admin","buyer"]),
        userValidators.checkId(),
        GlobalMiddleWare.checkError,
        userController.upadteUserProfile)
    }
    deleteRouter() {
        this.router.delete('/:id',
        GlobalMiddleWare.authMiddleware(["admin"]),
        userValidators.checkId(),
        GlobalMiddleWare.checkError,
        userController.deleteUserProfile)
    }
}

export default new customerRouter().router