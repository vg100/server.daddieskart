import { Router } from 'express'

import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { sellerController } from '../Controllers/sellerController';
import { sellerValidators } from '../Validators/sellerValidators';
export class sellerRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter() {
        this.router.get('/', sellerController.getAllSellers)
    }
    postRouter() {

        this.router.post('/register',
        sellerValidators.register(), 
        GlobalMiddleWare.checkError, 
        sellerController.register)
        
        this.router.post('/login', 
        sellerValidators.login(), 
        GlobalMiddleWare.checkError, 
        sellerController.login)

    }
    patchRouter() {
        this.router.patch('/:id',
        GlobalMiddleWare.authMiddleware(['seller','admin']),
        sellerValidators.update(),
        GlobalMiddleWare.checkError,
        sellerController.upadteSellerProfile)
    }
    deleteRouter() {
        this.router.delete('/:id',
        GlobalMiddleWare.authMiddleware(['admin']),
        sellerValidators.delete(),
        GlobalMiddleWare.checkError,
        sellerController.deleteSeller)
     }
}

export default new sellerRouter().router