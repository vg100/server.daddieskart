import { validationResult } from 'express-validator';
import * as Jwt from 'jsonwebtoken';
export class GlobalMiddleWare {
    static checkError(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
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
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            console.log(token, 'token')
            Jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }
                console.log(decoded, 'token')
                console.log(allowedRoles,'allowedRoles')
                if (allowedRoles.includes(decoded.role)) {
                    req.user = decoded;
                    next();
                } else {
                    return res.status(403).json({ message: 'Unauthorized' });
                }
            });
        };
    };
}