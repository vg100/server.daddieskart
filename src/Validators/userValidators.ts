import { body,param,query } from "express-validator";
import User from "../Models/user";


export class userValidators{
    static register() {
        return [
            body('mobile').notEmpty().isNumeric().withMessage('Mobile Number is Required')
        ];
    }
    static login() {
        return [body('mobile', 'Mobile Number is Required').isNumeric()
            .custom(async (mobile, {req}) => {
                const user = await User.findOne({mobile: mobile});
                if (!user) {
                    throw new Error('User does not exist');
                }
                if (!user.verified) {
                    throw new Error('please verify the otp');
                }
                req.user = user;
                return true;
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