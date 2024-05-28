"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMiddleWare = void 0;
const express_validator_1 = require("express-validator");
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
class GlobalMiddleWare {
    constructor() {
        this.requestInfo = {};
    }
    static checkError(req, res, next) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
            // const errorResponse = {};
            // errors.array().forEach(error => {
            //     errorResponse[error.param] = error.msg;
            // });
            // next(new Error(JSON.stringify(errorResponse)));
        }
        else {
            next();
        }
    }
}
exports.GlobalMiddleWare = GlobalMiddleWare;
GlobalMiddleWare.authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader : null;
        try {
            Jwt.verify(token, env_1.getEnvironmentVariables().jwt_secret, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        req.errorStatus = 401;
                        return next(new Error('Token has expired'));
                    }
                    else {
                        req.errorStatus = 401;
                        return next(new Error('Token must be provided'));
                    }
                }
                if (allowedRoles.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role)) {
                    req[(decoded === null || decoded === void 0 ? void 0 : decoded.role) || "user"] = decoded;
                    next();
                }
                else {
                    req.errorStatus = 401;
                    next(new Error('User Not Authorised'));
                }
            });
        }
        catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    };
};
