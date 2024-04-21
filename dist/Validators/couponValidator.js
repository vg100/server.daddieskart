"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponValidators = void 0;
const express_validator_1 = require("express-validator");
const coupon_1 = require("../Models/coupon");
class couponValidators {
    static validateCoupon() {
        return [
            express_validator_1.body('couponCode', 'Coupon code is required').notEmpty(),
            express_validator_1.body('totalAmount', 'Total amount is required').isNumeric(),
            (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { couponCode, totalAmount } = req.body;
                const coupon = yield coupon_1.default.findOne({ code: couponCode });
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
                next();
            })
        ];
    }
    static applyCoupon() {
        return [
            express_validator_1.body('couponCode', 'Coupon code is required').notEmpty(),
            express_validator_1.body('userId', 'userId is required').notEmpty(),
            (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { couponCode, userId } = req.body;
                const coupon = yield coupon_1.default.findOne({ code: couponCode });
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
                return true;
            })
        ];
    }
    static createCoupon() {
        return [
            express_validator_1.body('code').notEmpty().withMessage('Coupon code is required'),
            express_validator_1.body('discountType').notEmpty().withMessage('Discount type is required'),
            express_validator_1.body('value').notEmpty().withMessage('Discount value is required').isNumeric().withMessage('Discount value must be numeric'),
            express_validator_1.body('validFrom').notEmpty().withMessage('Valid from date is required').isISO8601().withMessage('Valid from date must be in ISO8601 format'),
            express_validator_1.body('validUntil').notEmpty().withMessage('Valid until date is required').isISO8601().withMessage('Valid until date must be in ISO8601 format'),
            express_validator_1.body('applicableProducts').isArray().withMessage('Applicable products must be an array'),
            express_validator_1.body('createdBy').notEmpty().withMessage('Created by is required'),
        ];
    }
}
exports.couponValidators = couponValidators;
