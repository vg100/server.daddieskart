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
exports.featureController = void 0;
const features_1 = require("../Models/features");
const user_1 = require("../Models/user");
class featureController {
    static createFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const features = new features_1.default(req.body);
                const newfeatures = yield features.save();
                res.status(201).json(newfeatures);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feature = yield features_1.default.find();
                res.json(feature);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getFeatureById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feature = yield features_1.default.findById(req.params.id);
                if (!feature) {
                    return res.status(404).json({ message: 'Feature not found' });
                }
                res.json(feature);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static upadteFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feature = yield features_1.default.findById(req.params.id);
                if (!feature) {
                    return res.status(404).json({ message: 'Feature not found' });
                }
                Object.assign(feature, req.body);
                const updatedfeature = yield feature.save();
                res.json(updatedfeature);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feature = yield features_1.default.findById(req.params.id);
                if (!feature) {
                    return res.status(404).json({ message: 'Feature not found' });
                }
                yield feature.remove();
                res.json({ message: 'Feature deleted' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static enableFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { featureId, userId } = req.body;
                const feature = yield features_1.default.findById(featureId);
                if (!feature) {
                    return res.status(404).json({ message: 'Feature not found' });
                }
                const user = yield user_1.default.findById(userId);
                if (!user.Permissions.includes(featureId)) {
                    user.Permissions.push(featureId);
                    yield user.save();
                    res.json({ message: 'Feature added' });
                }
                res.json({ message: 'Feature already added' });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.featureController = featureController;
