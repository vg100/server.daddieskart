"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productController_1 = require("../Controllers/productController");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const productValidator_1 = require("../Validators/productValidator");
class productRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', productController_1.productController.getAllProducts);
        this.router.get('/search', productController_1.productController.searchProducts);
        this.router.get('/:id', productController_1.productController.getProductsById);
        this.router.get('/:categoryId', productController_1.productController.getProductsByCategoryId);
        this.router.get('/topdeals', productController_1.productController.topProduct);
        this.router.get('/check-pin/:pid/:pincode', productController_1.productController.check_pincode);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller']), productController_1.productController.createProduct);
    }
    patchRouter() {
        this.router.patch('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller', 'admin']), productValidator_1.productValidator.checkId(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, productController_1.productController.updateProduct);
    }
    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller', 'admin']), productValidator_1.productValidator.checkId(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, productController_1.productController.deleteProduct);
    }
}
exports.productRouter = productRouter;
exports.default = new productRouter().router;
