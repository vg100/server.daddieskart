"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const sellerController_1 = require("../Controllers/sellerController");
const sellerValidators_1 = require("../Validators/sellerValidators");
class sellerRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', sellerController_1.sellerController.getAllSellers);
    }
    postRouter() {
        this.router.post('/register', sellerValidators_1.sellerValidators.register(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, sellerController_1.sellerController.register);
        this.router.post('/login', sellerValidators_1.sellerValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, sellerController_1.sellerController.login);
    }
    patchRouter() {
        this.router.patch('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller', 'admin']), sellerValidators_1.sellerValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, sellerController_1.sellerController.upadteSellerProfile);
    }
    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['admin']), sellerValidators_1.sellerValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, sellerController_1.sellerController.deleteSeller);
    }
}
exports.sellerRouter = sellerRouter;
exports.default = new sellerRouter().router;
