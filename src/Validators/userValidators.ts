import { body,query } from "express-validator";
import User from "../Models/user";


export class userValidators{
   static register(){
        return [body('mobile', 'Mobile Number is Required').custom((mobile, {req}) => {
            return User.findOne({mobile: mobile}).then(user => {
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
                return User.findOne({mobile: mobile}).then(customer => {
                    if (customer) {
                        req.user = customer;
                        return true;
                    } else {
                        throw  new Error('User Does Not Exist');
                    }
                });
            })]
    }
}