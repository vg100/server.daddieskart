"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebMiddleWare = void 0;
const jwt = require("jsonwebtoken");
class WebMiddleWare {
    static authMiddleware(req, res, next) {
        var _a;
        const authHeader = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
        try {
            const decoded = jwt.verify(authHeader, "user");
            console.log(decoded);
            // @ts-ignore
            if (decoded.userId) {
                // @ts-ignore
                req.userId = decoded.userId;
                return next();
            }
            else {
                return res.status(403).json({
                    message: "You are not logged in"
                });
            }
        }
        catch (e) {
            return res.status(403).json({
                message: "You are not logged in"
            });
        }
    }
    static workerMiddleware(req, res, next) {
        var _a;
        const authHeader = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
        console.log(authHeader);
        try {
            const decoded = jwt.verify(authHeader, "worker");
            // @ts-ignore
            if (decoded.userId) {
                // @ts-ignore
                req.userId = decoded.userId;
                return next();
            }
            else {
                return res.status(403).json({
                    message: "You are not logged in"
                });
            }
        }
        catch (e) {
            return res.status(403).json({
                message: "You are not logged in"
            });
        }
    }
}
exports.WebMiddleWare = WebMiddleWare;
