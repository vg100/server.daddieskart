import {Router} from 'express'

import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { categoryController } from '../Controllers/categoryController';
export class categoryRouter{
     router:Router;
    constructor(){
        this.router=Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter(){
       this.router.get('/',categoryController.getAllCategory)
       this.router.get('/:id',categoryController.getCategoryById)
      
    }
    postRouter(){
     
        this.router.post('/',GlobalMiddleWare.authMiddleware(["admin"]),categoryController.createCategory);
      
    }
    patchRouter(){
     
        this.router.patch('/:id',GlobalMiddleWare.authMiddleware(["admin"]),categoryController.upadteCategory);
      
    }
    deleteRouter(){
     
        this.router.delete('/:id',GlobalMiddleWare.authMiddleware(["admin"]),categoryController.deleteCategory);
      
    }
}

export default new categoryRouter().router