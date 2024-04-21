"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const cartController_1 = require("../Controllers/cartController");
class cartRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.removeRouter();
    }
    getRouter() {
        this.router.get('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["buyer"]), cartController_1.cartController.getCart);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["buyer"]), cartController_1.cartController.addItem);
    }
    patchRouter() {
        this.router.patch('/:productId', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["buyer"]), cartController_1.cartController.updateItemQuantityInCart);
    }
    removeRouter() {
        this.router.delete('/:productId', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["buyer"]), cartController_1.cartController.removeItem);
    }
}
exports.cartRouter = cartRouter;
exports.default = new cartRouter().router;
