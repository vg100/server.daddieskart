import { body } from 'express-validator';
import Review from '../Models/review';

export class reviewValidator {
    static addReview() {
        return [
            body('rating').notEmpty().withMessage('Rating is required').isString().withMessage('Rating must be a string'),
            body('reviewText').notEmpty().withMessage('Review text is required').isString().withMessage('Review text must be a string'),
        ];
    }
}