import { validationResult } from 'express-validator';
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariables } from '../environments/env';
export class GlobalMiddleWare {
    static checkError(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorResponse = {};
            errors.array().forEach(error => {
                errorResponse[error.param] = error.msg;
            });
            next(new Error(JSON.stringify(errorResponse)));
        } else {
            next();
        }
    }
    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader : null;
        try {
            Jwt.verify(token, 'secret', ((err, decoded) => {
                if (err) {
                    next(err)
                } else if (!decoded) {
                    req.errorStatus = 401;
                    next(new Error('User Not Authorised'))
                } else {
                    req.user = decoded;
                    next();
                }
            }))
        } catch (e) {
            req.errorStatus = 401;
            next(e);
        }
    }

    static authMiddleware = (allowedRoles) => {
        return (req, res, next) => {
            const authHeader = req.headers.authorization;
            const token = authHeader ? authHeader : null;
            try {
                Jwt.verify(token, getEnvironmentVariables().jwt_secret, (err, decoded) => {
                    if (err) {
                        next(new Error('token must be provided'))
                    }
                    if (allowedRoles.includes(decoded?.role)) {
                        req[decoded?.role || "user"] = decoded;
                        next();
                    } else {
                        req.errorStatus = 401;
                        next(new Error('User Not Authorised'))
                    }
                });
            } catch (e) {
                req.errorStatus = 401;
                next(e);
            }
        };
    };
}