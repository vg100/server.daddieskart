import { body,param,query } from "express-validator";
import User from "../Models/user";
import Category from "../Models/category";


export class categoryValidators{
    static checkId() {
        return [param('id').custom(async (id, { req }) => {
            const category = await Category.findOne({ _id: id });
            if (!category) {
                throw new Error('Category does not exist');
            }
            req.category = category;
            return true;
        })]


    }
}