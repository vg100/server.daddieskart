"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuresRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const featureController_1 = require("../Controllers/featureController");
class featuresRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), featureController_1.featureController.getAllFeature);
        this.router.get('/:id', featureController_1.featureController.getFeatureById);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), featureController_1.featureController.createFeature);
        this.router.post('/enablefeature', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), featureController_1.featureController.enableFeature);
    }
    patchRouter() {
        this.router.patch('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), featureController_1.featureController.upadteFeature);
    }
    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), featureController_1.featureController.deleteFeature);
    }
}
exports.featuresRouter = featuresRouter;
exports.default = new featuresRouter().router;
