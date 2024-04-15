import { Router } from "express";
import { productController } from "../Controllers/productController";
import { GlobalMiddleWare } from "../GlobalMiddleWare/GlobalMiddleWare";
import { Utils } from "../Utils/utils";


export class productRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }

    getRouter() {
        this.router.get('/',productController.getAllProducts)
        this.router.get('/search', productController.searchProducts)
        this.router.get('/:id', productController.getProductsById)
        this.router.get('/:categoryId', productController.getProductsByCategoryId)
        this.router.get('/topdeals', productController.topProduct)
       
       

    }
    postRouter() {
        this.router.post('/', productController.createProduct)
    }

    patchRouter() {
        this.router.patch('/:id', GlobalMiddleWare.authMiddleware(['seller']), productController.updateProduct)
    }

    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare.authMiddleware(['seller']), productController.deleteProduct)
    }
}

export default new productRouter().router