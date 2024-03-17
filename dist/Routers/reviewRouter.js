"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const reviewController_1 = require("../Controllers/reviewController");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
class reviewRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchtRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller']), reviewController_1.reviewController.getAllReview);
        this.router.get('/target/:targetId', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['seller']), reviewController_1.reviewController.getReviewByTarget);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), reviewController_1.reviewController.createReview);
    }
    patchtRouter() {
        this.router.patch('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), reviewController_1.reviewController.updateReview);
    }
    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), reviewController_1.reviewController.deleteReview);
    }
}
exports.reviewRouter = reviewRouter;
exports.default = new reviewRouter().router;
