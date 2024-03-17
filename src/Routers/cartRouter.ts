import { Router } from 'express'
import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { categoryController } from '../Controllers/categoryController';
import { cartController } from '../Controllers/cartController';

import { cartValidators } from '../Validators/cartValidators';
export class cartRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.removeRouter();

    }

    getRouter() {
        this.router.get('/', GlobalMiddleWare.authMiddleware(["buyer"]), cartController.getCart)

    }
    postRouter() {

        this.router.post('/', GlobalMiddleWare.authMiddleware(["buyer"]), cartController.addItem)

    }
    patchRouter(){
        this.router.patch('/:productId', GlobalMiddleWare.authMiddleware(["buyer"]), cartController.updateItemQuantityInCart)
    }

   removeRouter(){
        this.router.delete('/:productId', GlobalMiddleWare.authMiddleware(["buyer"]), cartController.removeItem)
    }

}

export default new cartRouter().router