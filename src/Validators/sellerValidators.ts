import { body,query } from "express-validator";
import User from "../Models/user";
import Seller from "../Models/seller";


export class sellerValidators{
   static register(){
        return [body('mobile', 'Mobile Number is Required').custom((mobile, {req}) => {
            return Seller.findOne({mobile: mobile}).then(user => {
                if (user) {
                    throw new Error('User Already Exist');
                } else {
                    return true;
                }
            })
        }),
                
           ];
    }
    static login() {
        return [body('mobile', 'Mobile Number is Required')
            .custom((mobile, {req}) => {
                console.log(mobile)
                return Seller.findOne({mobile: mobile}).then(customer => {
                    if (customer) {
                        req.seller = customer;
                        return true;
                    } else {
                        throw  new Error('User Does Not Exist');
                    }
                });
            })]
    }
}