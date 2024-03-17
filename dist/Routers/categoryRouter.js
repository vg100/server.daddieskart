"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const categoryController_1 = require("../Controllers/categoryController");
class categoryRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', categoryController_1.categoryController.getAllCategory);
        this.router.get('/:id', categoryController_1.categoryController.getCategoryById);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), categoryController_1.categoryController.createCategory);
    }
    patchRouter() {
        this.router.patch('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), categoryController_1.categoryController.upadteCategory);
    }
    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), categoryController_1.categoryController.deleteCategory);
    }
}
exports.categoryRouter = categoryRouter;
exports.default = new categoryRouter().router;
