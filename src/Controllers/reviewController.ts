import Review from "../Models/review";

export class reviewController{
 static async createReview(req,res,next){

    try {
        const review = new Review(req.body);
        const newReview = await review.save();
        res.status(201).json(newReview);

    } catch (e) {
        next(e);
    }
 }

 static async getAllReview(req,res,next){

    try {
        const reviews = await Review.find();
        res.json(reviews);
    

    } catch (e) {
        next(e);
    }
 }

 static async getReviewByTarget(req,res,next){

    try {
        const reviews = await Review.find({ target: req.params.targetId });
        res.json(reviews);
    } catch (e) {
        next(e);
    }
 }

 static async updateReview(req,res,next){

    try {
        const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    Object.assign(review, req.body);
    const updatedReview = await review.save();
    res.json(updatedReview);
    } catch (e) {
        next(e);
    }
 }

 static async deleteReview(req,res,next){
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
          return res.status(404).json({ message: 'Review not found' });
        }
        await review.remove();
        res.json({ message: 'Review deleted' });
    } catch (e) {
        next(e);
    }
 }



}