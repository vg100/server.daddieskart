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
exports.offerController = void 0;
const offer_1 = require("../Models/offer");
const soket_1 = require("../Utils/soket");
class offerController {
    static getOffer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.buyer._id;
            try {
                const offers = yield offer_1.default.find(Object.assign(Object.assign({}, req.body), { user }));
                res.status(200).json(offers);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static createOffer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { offer } = req.body;
                const newOffer = {
                    amount: offer,
                    user: req.buyer._id,
                    product: req.params.productId
                };
                const products = new offer_1.default(newOffer);
                yield products.save();
                soket_1.default.io.emit('newOffer', newOffer);
                res.status(200).json({ message: 'Bargaining request sent' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.offerController = offerController;
