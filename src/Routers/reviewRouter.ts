import { Router } from "express";
import { reviewController } from "../Controllers/reviewController";
import { GlobalMiddleWare } from "../GlobalMiddleWare/GlobalMiddleWare";
import { Utils } from "../Utils/utils";
import { reviewValidator } from "../Validators/reviewValidator";


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
        this.router.get('/:pid/:page',reviewController.getAllReviewByProductId)
        this.router.get('/target/:targetId',reviewController.getReviewByTarget)
      
    }
    postRouter() {
        this.router.post('/' ,GlobalMiddleWare.authMiddleware(['buyer']), 
        // reviewValidator.addReview(),
        new Utils().multer.single("images") , 
        // GlobalMiddleWare.checkError,
        reviewController.createReview)
    }

    patchtRouter() {
        this.router.patch('/:id',reviewController.updateReview)
    }

    deleteRouter() {
        this.router.delete('/:id', reviewController.deleteReview)
    }

}

export default new reviewRouter().router