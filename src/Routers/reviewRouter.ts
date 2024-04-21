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
        this.router.get('/',reviewController.getAllReview)
        this.router.get('/target/:targetId',reviewController.getReviewByTarget)
    }
    postRouter() {
        this.router.post('/', reviewController.createReview)
    }

    patchtRouter() {
        this.router.patch('/:id',reviewController.updateReview)
    }

    deleteRouter() {
        this.router.delete('/:id', reviewController.deleteReview)
    }

}

export default new reviewRouter().router