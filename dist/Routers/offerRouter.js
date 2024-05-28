"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const offerController_1 = require("../Controllers/offerController");
class offerRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.removeRouter();
    }
    getRouter() {
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["buyer"]), offerController_1.offerController.getOffer);
        this.router.post('/:productId', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["buyer"]), offerController_1.offerController.createOffer);
    }
    patchRouter() { }
    removeRouter() { }
}
exports.offerRouter = offerRouter;
exports.default = new offerRouter().router;
