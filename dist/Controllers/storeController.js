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
exports.storeController = void 0;
const stores_1 = require("../Models/stores");
class storeController {
    static getStores(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stores = yield stores_1.default.find();
                res.json(stores);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
    static addStores(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stores = new stores_1.default(req.body);
                const newStore = yield stores.save();
                res.json(newStore);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
}
exports.storeController = storeController;
