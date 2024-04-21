"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const couponValidator_1 = require("../Validators/couponValidator");
const couponController_1 = require("../Controllers/couponController");
class couponRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
    }
    getRouter() {
        this.router.get('/', couponController_1.couponController.getAllCoupon);
    }
    postRouter() {
        this.router.post('/', couponValidator_1.couponValidators.createCoupon(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, couponController_1.couponController.createCoupon);
        this.router.post('/validate-coupon', couponController_1.couponController.validateCoupon);
        this.router.post('/apply-coupon', couponController_1.couponController.applyCoupon);
    }
}
exports.couponRouter = couponRouter;
exports.default = new couponRouter().router;
