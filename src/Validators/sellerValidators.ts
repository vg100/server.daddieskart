import { body,param,query } from "express-validator";
import User from "../Models/user";
import Seller from "../Models/seller";
import mongoose from "mongoose";


export class sellerValidators{
   static register(){
        return [body('mobile', 'Mobile Number is Required').isNumeric()
        .custom((mobile, {req}) => {
            return Seller.findOne({mobile: mobile}).then(user => {
                if (user) {
                    throw new Error('Seller Already Exist');
                } else {
                    return true;
                }
            })
        }),
                
           ];
    }
    static login() {
        return [body('mobile', 'Mobile Number is Required').isNumeric()
            .custom((mobile, {req}) => {
                console.log(mobile)
                return Seller.findOne({mobile: mobile}).then(customer => {
                    if (customer) {
                        req.seller = customer;
                        return true;
                    } else {
                        throw  new Error('Seller Does Not Exist');
                    }
                });
            })]
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