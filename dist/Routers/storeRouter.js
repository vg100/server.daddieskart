"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRouter = void 0;
const express_1 = require("express");
const storeController_1 = require("../Controllers/storeController");
class storeRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
    }
    getRouter() {
        this.router.get('/', storeController_1.storeController.getStores);
    }
    postRouter() {
        this.router.post('/', storeController_1.storeController.addStores);
    }
    patchRouter() {
        this.router.patch('/:productId', storeController_1.storeController.getStores);
    }
}
exports.storeRouter = storeRouter;
exports.default = new storeRouter().router;
