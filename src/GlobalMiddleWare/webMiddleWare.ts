import { validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';

import { NextFunction } from 'express';

export class WebMiddleWare {
    static authMiddleware(req, res, next){
        const authHeader = req.headers["authorization"] ?? "";

        try {
            const decoded = jwt.verify(authHeader, "user");
            console.log(decoded);
            // @ts-ignore
            if (decoded.userId) {
                // @ts-ignore
                req.userId = decoded.userId;
                return next();
            } else {
                return res.status(403).json({
                    message: "You are not logged in"
                })
            }
        } catch (e) {
            return res.status(403).json({
                message: "You are not logged in"
            })
        }
    }

    static workerMiddleware(req, res, next){
        const authHeader = req.headers["authorization"] ?? "";

        console.log(authHeader);
        try {
            const decoded = jwt.verify(authHeader, "worker");
            // @ts-ignore
            if (decoded.userId) {
                // @ts-ignore
                req.userId = decoded.userId;
                return next();
            } else {
                return res.status(403).json({
                    message: "You are not logged in"
                })
            }
        } catch (e) {
            return res.status(403).json({
                message: "You are not logged in"
            })
        }

    }
}