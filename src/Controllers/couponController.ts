import Coupon from "../Models/coupon";
import Order from "../Models/order";

export class couponController {


    static async getAllCoupon(req, res, next) {
        try {
            const newCoupon = await Coupon.find();
            res.status(201).json(newCoupon);
        } catch (e) {
            next(e);
        }
    }
    static async createCoupon(req, res, next) {
        try {
            const { code, discountType, value, validFrom, validUntil, applicableProducts, createdBy } = req.body;
            const existingCoupon = await Coupon.findOne({ code });

            if (existingCoupon) {
                return res.status(400).json({ error: 'Coupon code already exists' });
            }

            const newCoupon = await Coupon.create({
                code,
                discountType,
                value,
                validFrom,
                validUntil,
                applicableProducts,
                createdBy,
            });

            res.status(201).json(newCoupon);

        } catch (e) {
            next(e);
        }
    }
    static async validateCoupon(req, res, next) {
        try {
            const { couponCode, userId, totalAmount, products } = req.body;
        
            // Find coupon by code
            const coupon = await Coupon.findOne({ code: couponCode });
        
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
              const userUsedCount = await Order.countDocuments({ userId, coupon: coupon._id });
        
              if (userUsedCount >= coupon.maxUsesPerUser) {
                return res.status(400).json({ error: 'Coupon usage limit reached for this user' });
              }
            }
        
            res.json({ valid: true, coupon });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
    static async applyCoupon(req, res, next) {
        try {
            const { couponCode, userId, orderTotal } = req.body;
        
            // Find coupon by code
            const coupon = await Coupon.findOne({ code: couponCode });
        
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
            const userCouponUsage = await Order.countDocuments({ userId, coupon: coupon._id });
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
            } else if (coupon.discountType === 'fixed') {
              discountAmount = coupon.value;
            }
        
            // Update the order with the discount amount
            // For illustration, we'll log the discount amount here
            console.log('Discount applied:', discountAmount);
        
            // Mark the coupon as used and update the usedCount
            coupon.usedCount++;
            await coupon.save();
        
            res.json({ success: true, discountAmount });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }


}