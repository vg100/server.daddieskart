import { body, param, query } from "express-validator";
import User from "../Models/user";
import Seller from "../Models/seller";
import mongoose from "mongoose";


export class sellerValidators {
    static register() {
        return [
            body('mobile', 'Mobile Number is Required').notEmpty().isNumeric(),
            body('mobile').custom(async (mobile, { req }) => {
                const seller = await Seller.findOne({ mobile: mobile })
                if (seller) {
                    throw new Error('Seller Already Exists');
                }
                return true;
            }),
            body('email', 'Email is Required').notEmpty().isEmail(),
            body('sellerType', 'sellerType is Required').notEmpty(),
            body('GSTIN', 'GSTIN is Required').notEmpty(),
            body('password')
                .notEmpty()
                .withMessage('Password is Required')
                .isLength({ min: 6, max: 6 })
                .withMessage('Password must be at least 6 characters'),
        ];
    }
    static login() {
        return [body('mobile', 'Mobile Number is Required').notEmpty().isNumeric()
            .custom((mobile, { req }) => {
                console.log(mobile)
                return Seller.findOne({ mobile: mobile }).then(customer => {
                    if (customer) {
                        req.seller = customer;
                        return true;
                    } else {
                        throw new Error('Seller Does Not Exist');
                    }
                });
            }),
        body('password')
            .notEmpty()
            .withMessage('Password is Required')
            .isLength({ min: 6, max: 8 })
            .withMessage('Password must be at least 6 characters'),

        ]
    }
    static delete() {
        return [param('id').custom(async (id, { req }) => {
            const seller = await Seller.findOne({ _id: id });
            if (!seller) {
                throw new Error('Seller does not exist');
            }
            req.seller = seller;
            return true;
        })]


    }
    static update() {
        return [param('id').custom(async (id, { req }) => {
            const seller = await Seller.findOne({ _id: id });
            if (!seller) {
                throw new Error('Seller does not exist');
            }
            req.seller = seller;
            return true;
        })]


    }
}