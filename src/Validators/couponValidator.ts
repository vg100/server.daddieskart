import { body, query } from "express-validator";
import User from "../Models/user";
import Coupon from "../Models/coupon";


export class couponValidators {
    static validateCoupon() {
        return [
            body('couponCode', 'Coupon code is required').notEmpty(),
            body('totalAmount', 'Total amount is required').isNumeric(),
            async (req, res, next) => {
                const { couponCode, totalAmount } = req.body;
                const coupon = await Coupon.findOne({ code: couponCode });
                if (!coupon) {
                    throw new Error('Coupon not found');
                }

                if (!coupon.active) {
                    throw new Error('Coupon is not active');
                }

                if (coupon.validUntil < new Date()) {
                    throw new Error('Coupon has expired');
                }

                if (coupon.maxUses !== null && coupon.maxUses <= coupon.usedCount) {
                    throw new Error('Coupon has reached its usage limit');
                }

                if (coupon.minimumPurchase > totalAmount) {
                    throw new Error('Minimum purchase amount not met');
                }

                req.coupon = coupon;
                // return true
                next()
            }
        ];
    }
    static applyCoupon() {
        return [
            body('couponCode', 'Coupon code is required').notEmpty(),
            body('userId', 'userId is required').notEmpty(),
            async (req, res, next) => {
                const { couponCode, userId } = req.body;
                const coupon = await Coupon.findOne({ code: couponCode });
                if (!coupon) {
                    throw new Error('Coupon not found');
                }

                if (!coupon.active) {
                    throw new Error('Coupon is not active');
                }

                if (coupon.validUntil < new Date()) {
                    throw new Error('Coupon has expired');
                }

                if (coupon.maxUses !== null && coupon.maxUses <= coupon.usedCount) {
                    throw new Error('Coupon has reached its usage limit');
                }

                req.coupon = coupon;
                return true
            }
        ];
    }
    static createCoupon() {
        return [
            body('code').notEmpty().withMessage('Coupon code is required'),
            body('discountType').notEmpty().withMessage('Discount type is required'),
            body('value').notEmpty().withMessage('Discount value is required').isNumeric().withMessage('Discount value must be numeric'),
            body('validFrom').notEmpty().withMessage('Valid from date is required').isISO8601().withMessage('Valid from date must be in ISO8601 format'),
            body('validUntil').notEmpty().withMessage('Valid until date is required').isISO8601().withMessage('Valid until date must be in ISO8601 format'),
            body('applicableProducts').isArray().withMessage('Applicable products must be an array'),
            body('createdBy').notEmpty().withMessage('Created by is required'),  
        ];
    }


}