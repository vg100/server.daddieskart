import { validationResult } from 'express-validator';
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariables } from '../environments/env';
export class GlobalMiddleWare {
     requestInfo:any = {};
    static checkError(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
         
            next(new Error(errors.array()[0].msg));
            // const errorResponse = {};
            // errors.array().forEach(error => {
            //     errorResponse[error.param] = error.msg;
            // });
            // next(new Error(JSON.stringify(errorResponse)));
        } else {
            next();
        }
    }

    static authMiddleware = (allowedRoles) => {
        return (req, res, next) => {
            const authHeader = req.headers.authorization;
            const token = authHeader ? authHeader : null;
            try {
                Jwt.verify(token, getEnvironmentVariables().jwt_secret, (err, decoded) => {
                    if (err) {

                        if (err.name === 'TokenExpiredError') {
                            req.errorStatus = 401;
                            return next(new Error('Token has expired'));
                        } else {
                            req.errorStatus = 401;
                            return next(new Error('Token must be provided'));
                        }
                        
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