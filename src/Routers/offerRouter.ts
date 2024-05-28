import { Router } from 'express'
import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { cartController } from '../Controllers/cartController';
import { offerController } from '../Controllers/offerController';

export class offerRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.removeRouter();

    }

    getRouter() {
       
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare.authMiddleware(["buyer"]), offerController.getOffer)
        this.router.post('/:productId', GlobalMiddleWare.authMiddleware(["buyer"]), offerController.createOffer)
    }

    patchRouter(){}

   removeRouter(){}
        

}

export default new offerRouter().router