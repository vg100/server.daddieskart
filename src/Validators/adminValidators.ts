import { body,query } from "express-validator";
import User from "../Models/user";
import Admin from "../Models/admin";




export class adminValidators{
    static login() {
        return [body('mobile', 'Mobile Number is Required').isNumeric()
            .custom((mobile, {req}) => {
                return Admin.findOne({mobile: mobile}).then(customer => {
                    if (customer) {
                        req.admin = customer;
                        return true;
                    } else {
                        throw  new Error('User Does Not Exist');
                    }
                });
            })]
    }
}