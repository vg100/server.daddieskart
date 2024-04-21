import { body,param,query } from "express-validator";
import User from "../Models/user";


export class userValidators{
   static register(){
        return [body('mobile', 'Mobile Number is Required').isNumeric()
        .custom((mobile, {req}) => {
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
        return [body('mobile', 'Mobile Number is Required').isNumeric()
            .custom((mobile, {req}) => {
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

    static checkId() {
        return [param('id').custom(async (id, { req }) => {
            const user = await User.findOne({ _id: id });
            if (!user) {
                throw new Error('User does not exist');
            }
            req.user = user;
            return true;
        })]


    }
}