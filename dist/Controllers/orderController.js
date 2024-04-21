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
exports.orderController = void 0;
const order_1 = require("../Models/order");
class orderController {
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = new order_1.default(req.body);
                const newOrder = yield order.save();
                res.status(201).json(newOrder);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_1.default.find();
                res.json(orders);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getOrdersByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_1.default.find({ user: req.params.userId });
                res.json(orders);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getOrdersByStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_1.default.find({ status: req.params.status });
                res.json(orders);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getOrdersById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_1.default.findById(req.params.id);
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                res.json(order);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_1.default.findById(req.params.id);
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                Object.assign(order, req.body);
                const updatedOrder = yield order.save();
                res.json(updatedOrder);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_1.default.findById(req.params.id);
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                yield order.remove();
                res.json({ message: 'Order deleted' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.orderController = orderController;
