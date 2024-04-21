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
exports.couponController = void 0;
const coupon_1 = require("../Models/coupon");
const order_1 = require("../Models/order");
class couponController {
    static getAllCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCoupon = yield coupon_1.default.find();
                res.status(201).json(newCoupon);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static createCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, discountType, value, validFrom, validUntil, applicableProducts, createdBy } = req.body;
                const existingCoupon = yield coupon_1.default.findOne({ code });
                if (existingCoupon) {
                    return res.status(400).json({ error: 'Coupon code already exists' });
                }
                const newCoupon = yield coupon_1.default.create({
                    code,
                    discountType,
                    value,
                    validFrom,
                    validUntil,
                    applicableProducts,
                    createdBy,
                });
                res.status(201).json(newCoupon);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static validateCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { couponCode, userId, totalAmount, products } = req.body;
                // Find coupon by code
                const coupon = yield coupon_1.default.findOne({ code: couponCode });
                if (!coupon) {
                    return res.status(404).json({ error: 'Coupon not found' });
                }
                if (!coupon.active) {
                    return res.status(400).json({ error: 'Coupon is not active' });
                }
                if (coupon.validUntil < new Date()) {
                    return res.status(400).json({ error: 'Coupon has expired' });
                }
                if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
                    return res.status(400).json({ error: 'Coupon has reached its usage limit' });
                }
                if (coupon.minimumPurchase && totalAmount < coupon.minimumPurchase) {
                    return res.status(400).json({ error: 'Minimum purchase amount not met' });
                }
                // Check if the coupon is applicable to specific products
                if (coupon.applicableProducts.length > 0) {
                    const productIds = products.map(product => product._id.toString());
                    const validProducts = coupon.applicableProducts.map(product => product.toString());
                    const valid = validProducts.some(productId => productIds.includes(productId));
                    if (!valid) {
                        return res.status(400).json({ error: 'Coupon is not applicable to any products in the order' });
                    }
                }
                // Additional validation logic (e.g., check if user has already used the coupon)
                // Check if the user has reached the maximum usage limit per user
                if (coupon.maxUsesPerUser !== null) {
                    const userUsedCount = yield order_1.default.countDocuments({ userId, coupon: coupon._id });
                    if (userUsedCount >= coupon.maxUsesPerUser) {
                        return res.status(400).json({ error: 'Coupon usage limit reached for this user' });
                    }
                }
                res.json({ valid: true, coupon });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static applyCoupon(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { couponCode, userId, orderTotal } = req.body;
                // Find coupon by code
                const coupon = yield coupon_1.default.findOne({ code: couponCode });
                if (!coupon) {
                    return res.status(404).json({ error: 'Coupon not found' });
                }
                if (!coupon.active) {
                    return res.status(400).json({ error: 'Coupon is not active' });
                }
                if (coupon.validUntil < new Date()) {
                    return res.status(400).json({ error: 'Coupon has expired' });
                }
                if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
                    return res.status(400).json({ error: 'Coupon has reached its usage limit' });
                }
                // Check if the user has already used the coupon maxUsesPerUser times
                const userCouponUsage = yield order_1.default.countDocuments({ userId, coupon: coupon._id });
                if (coupon.maxUsesPerUser !== null && userCouponUsage >= coupon.maxUsesPerUser) {
                    return res.status(400).json({ error: 'User has reached the maximum usage of this coupon' });
                }
                // Check if the order total meets the minimum purchase requirement
                if (coupon.minimumPurchase && orderTotal < coupon.minimumPurchase) {
                    return res.status(400).json({ error: `Minimum purchase amount of $${coupon.minimumPurchase} not met` });
                }
                // Additional validation logic (e.g., check if user has already used the coupon)
                // Apply coupon to the order
                let discountAmount = 0;
                if (coupon.discountType === 'percentage') {
                    discountAmount = (coupon.value / 100) * orderTotal;
                }
                else if (coupon.discountType === 'fixed') {
                    discountAmount = coupon.value;
                }
                // Update the order with the discount amount
                // For illustration, we'll log the discount amount here
                console.log('Discount applied:', discountAmount);
                // Mark the coupon as used and update the usedCount
                coupon.usedCount++;
                yield coupon.save();
                res.json({ success: true, discountAmount });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.couponController = couponController;
