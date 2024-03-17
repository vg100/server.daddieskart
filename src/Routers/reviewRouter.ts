import { Router } from "express";
import { reviewController } from "../Controllers/reviewController";
import { GlobalMiddleWare } from "../GlobalMiddleWare/GlobalMiddleWare";


export class reviewRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
        this.postRouter();
        this.patchtRouter();
        this.deleteRouter()
    }

    getRouter() {
        this.router.get('/', GlobalMiddleWare.authMiddleware(['seller']),reviewController.getAllReview)
        this.router.get('/target/:targetId', GlobalMiddleWare.authMiddleware(['seller']),reviewController.getReviewByTarget)


    }
    postRouter() {
        this.router.post('/', GlobalMiddleWare.authMiddleware(['buyer']), reviewController.createReview)
    }

    patchtRouter() {
        this.router.patch('/:id', GlobalMiddleWare.authMiddleware(['buyer']), reviewController.updateReview)
    }

    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare.authMiddleware(['buyer']), reviewController.deleteReview)
    }

}

export default new reviewRouter().router