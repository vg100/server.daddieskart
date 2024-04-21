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
exports.cartController = void 0;
const cart_1 = require("../Models/cart");
class cartController {
    static getCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_1.default.findOne({ user: req.user._id }).populate('items.product', 'name price');
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }
                res.json(cart);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
    static addItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, quantity } = req.body;
                const cart = yield cart_1.default.findOne({ user: req.user._id });
                // Check if cart exists for the user
                if (!cart) {
                    const newCart = new cart_1.default({ user: req.user._id, items: [{ product: productId, quantity }] });
                    yield newCart.save();
                    return res.status(201).json(newCart);
                }
                // Check if the product already exists in the cart
                const existingItem = cart.items.find(item => item.product.toString() === productId);
                if (existingItem) {
                    existingItem.quantity += quantity;
                }
                else {
                    cart.items.push({ product: productId, quantity });
                }
                yield cart.save();
                res.json(cart);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
    static updateItemQuantityInCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const { quantity } = req.body;
                const cart = yield cart_1.default.findOne({ user: req.user._id });
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }
                const itemToUpdate = cart.items.find(item => item.product.toString() === productId);
                if (!itemToUpdate) {
                    return res.status(404).json({ message: 'Item not found in cart' });
                }
                itemToUpdate.quantity = quantity;
                yield cart.save();
                res.json(cart);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
    static removeItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const cart = yield cart_1.default.findOne({ user: req.user._id });
                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }
                cart.items = cart.items.filter(item => item.product.toString() !== productId);
                yield cart.save();
                res.json(cart);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
}
exports.cartController = cartController;
