import { Router } from 'express'
import { storeController } from '../Controllers/storeController';
export class storeRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();

    }

    getRouter() {
        this.router.get('/', storeController.getStores)

    }
    postRouter() {

        this.router.post('/', storeController.addStores )

    }
    patchRouter(){
        this.router.patch('/:productId', storeController.getStores)
    }



}

export default new storeRouter().router