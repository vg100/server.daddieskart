import { Router } from 'express'

import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { sellerController } from '../Controllers/sellerController';
import { sellerValidators } from '../Validators/sellerValidators';
import { adminValidators } from '../Validators/adminValidators';
import { adminController } from '../Controllers/adminController';
export class adminRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter()
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter(){
        this.router.get('/', adminController.getAllUser)
    }
    postRouter() {
        this.router.post('/login', adminValidators.login(), GlobalMiddleWare.checkError, adminController.login)
        this.router.post('/register',adminController.register)

    }
    patchRouter() {

    }
    deleteRouter() {
   
     }
}

export default new adminRouter().router