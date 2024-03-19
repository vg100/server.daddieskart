import {Router} from 'express'

import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { categoryController } from '../Controllers/categoryController';
import { featureController } from '../Controllers/featureController';
export class featuresRouter{
     router:Router;
    constructor(){
        this.router=Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter(){
       this.router.get('/',GlobalMiddleWare.authMiddleware(["admin"]),featureController.getAllFeature)
       this.router.get('/:id',featureController.getFeatureById)
      
    }
    postRouter(){
     
        this.router.post('/',GlobalMiddleWare.authMiddleware(["admin"]),featureController.createFeature);
        this.router.post('/enablefeature',GlobalMiddleWare.authMiddleware(["admin"]),featureController.enableFeature)
    }
    patchRouter(){
     
        this.router.patch('/:id',GlobalMiddleWare.authMiddleware(["admin"]),featureController.upadteFeature);
      
    }
    deleteRouter(){
     
        this.router.delete('/:id',GlobalMiddleWare.authMiddleware(["admin"]),featureController.deleteFeature);
      
    }
}

export default new featuresRouter().router