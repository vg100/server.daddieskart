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
exports.GlobalMiddleWare = void 0;
const express_validator_1 = require("express-validator");
const Jwt = require("jsonwebtoken");
class GlobalMiddleWare {
    static checkError(req, res, next) {
        const error = express_validator_1.validationResult(req);
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
        }
        else {
            next();
        }
    }
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            const token = authHeader ? authHeader : null;
            try {
                Jwt.verify(token, 'secret', ((err, decoded) => {
                    if (err) {
                        next(err);
                    }
                    else if (!decoded) {
                        req.errorStatus = 401;
                        next(new Error('User Not Authorised'));
                    }
                    else {
                        req.user = decoded;
                        next();
                    }
                }));
            }
            catch (e) {
                req.errorStatus = 401;
                next(e);
            }
        });
    }
}
exports.GlobalMiddleWare = GlobalMiddleWare;
GlobalMiddleWare.authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        console.log(token, 'token');
        Jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            console.log(decoded, 'token');
            console.log(allowedRoles, 'allowedRoles');
            if (allowedRoles.includes(decoded.role)) {
                req.user = decoded;
                next();
            }
            else {
                return res.status(403).json({ message: 'Unauthorized' });
            }
        });
    };
};
