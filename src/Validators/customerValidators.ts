import { body,query } from "express-validator";
import User from "../Models/user";


export class customerValidators{
   static register(){
        return [body('email', 'Email is Required').isEmail().custom((email, {req}) => {
            return User.findOne({email: email}).then(user => {
                if (user) {
                    throw new Error('User Already Exist');
                } else {
                    return true;
                }
            })
        }),
            body('password', 'Password is Required').isAlphanumeric()
                
           ];
    }
    static login() {
        return [query('email', 'Email is Required').isEmail()
            .custom((email, {req}) => {
                return User.findOne({email: email}).then(customer => {
                    if (customer) {
                        req.customer = customer;
                        return true;
                    } else {
                        throw  new Error('User Does Not Exist');
                    }
                });
            }), query('password', 'Password is Required').isAlphanumeric()]
    }
}