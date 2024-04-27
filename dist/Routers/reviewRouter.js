"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const reviewController_1 = require("../Controllers/reviewController");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const utils_1 = require("../Utils/utils");
class reviewRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchtRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', reviewController_1.reviewController.getAllReview);
        this.router.get('/:pid/:page', reviewController_1.reviewController.getAllReviewByProductId);
        this.router.get('/target/:targetId', reviewController_1.reviewController.getReviewByTarget);
    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), 
        // reviewValidator.addReview(),
        new utils_1.Utils().multer.single("images"), 
        // GlobalMiddleWare.checkError,
        reviewController_1.reviewController.createReview);
    }
    patchtRouter() {
        this.router.patch('/:id', reviewController_1.reviewController.updateReview);
    }
    deleteRouter() {
        this.router.delete('/:id', reviewController_1.reviewController.deleteReview);
    }
}
exports.reviewRouter = reviewRouter;
exports.default = new reviewRouter().router;
