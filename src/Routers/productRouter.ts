import { Router } from "express";
import { productController } from "../Controllers/productController";
import { GlobalMiddleWare } from "../GlobalMiddleWare/GlobalMiddleWare";


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
        this.router.get('/', productController.getAllProducts)
        this.router.get('/:id', productController.getProductsById)


    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare.authMiddleware(['seller']), productController.createProduct)
    }

    patchRouter() {
        this.router.patch('/:id', GlobalMiddleWare.authMiddleware(['seller']), productController.updateProduct)
    }

    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare.authMiddleware(['seller']), productController.deleteProduct)
     }
}

export default new productRouter().router