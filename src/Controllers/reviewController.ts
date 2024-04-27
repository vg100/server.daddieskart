import Product from "../Models/product";
import Review from "../Models/review";
import awsServices from "../Utils/awsServices";

export class reviewController {
    static async createReview(req, res, next) {
        try {

            awsServices.uploadFile(req.file.path, req.file.filename, async (err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                const review = new Review({
                    ...req.body,
                    user: req.buyer._id,
                    images:[data]

                });
                const updatedProduct = await Product.findByIdAndUpdate(
                    req.body?.product,
                    { $push: { productReviews: review._id } },
                    { new: true }
                );
                await Promise.all([review.save(), updatedProduct.save()]);
                res.status(201).json(review);
            })

        } catch (e) {
            next(e);
        }
    }


    static async getAllReviewByProductId(req, res, next) {
        try {
            const perPage: number = 4;
            const currentPage: any = req.params.page || 1;
            const totalReviews = await Review.countDocuments({ product: req.params?.pid });

            const response: any = {
                reviews: [],
                totalRating: 0,
                totalTextReviews: 0,
                rating: 0,
                images: []
            };
            response.reviews = await Review.find({ product: req.params?.pid }).populate({ path: 'user', select: 'name' });

            response.reviews.forEach(review => {
                response.totalRating += review.rating;
                if (review.reviewText) {
                    response.totalTextReviews++;
                }
                if (review.images && review.images.length > 0) {
                    response.images.push(...review.images);
                }
            });


            if (response.totalTextReviews !== 0) {
                const averageRating = response.totalRating / response.totalTextReviews;
                response.rating = ((averageRating / 5) * 5).toFixed(1);
            }

            response.reviews = response.reviews.slice((parseInt(currentPage) - 1) * perPage, parseInt(currentPage) * perPage);
            response.totalPages = Math.ceil(totalReviews / perPage);
            response.hasNextPage = parseInt(currentPage) < response.totalPages;

            res.json(response);

        } catch (e) {
            next(e);
        }
    }

    static async getAllReview(req, res, next) {

        try {
            const reviews = await Review.find();
            res.json(reviews);


        } catch (e) {
            next(e);
        }
    }

    static async getReviewByTarget(req, res, next) {

        try {
            const response: any = {}
            response.reviews = await Review.find({ target: req.params.targetId });
            res.json(response);

        } catch (e) {
            next(e);
        }
    }

    static async updateReview(req, res, next) {

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

    static async deleteReview(req, res, next) {
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