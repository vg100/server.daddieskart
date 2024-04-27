import { Router } from "express";
import { productController } from "../Controllers/productController";
import { GlobalMiddleWare } from "../GlobalMiddleWare/GlobalMiddleWare";
import { Utils } from "../Utils/utils";
import { productValidator } from "../Validators/productValidator";


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
        this.router.get('/check-pin/:pid/:pincode',productController.check_pincode)
       

    }
    postRouter() {
        this.router.post('/',GlobalMiddleWare.authMiddleware(['seller']),productController.createProduct)
    }

    patchRouter() {
        this.router.patch('/:id',
        GlobalMiddleWare.authMiddleware(['seller','admin']),
        productValidator.checkId(),
        GlobalMiddleWare.checkError,
        productController.updateProduct
        )
    }

    deleteRouter() {
        this.router.delete('/:id', 
        GlobalMiddleWare.authMiddleware(['seller','admin']),
        productValidator.checkId(),
        GlobalMiddleWare.checkError,
        productController.deleteProduct)
    }
}

export default new productRouter().router