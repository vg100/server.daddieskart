import * as jwt from "jsonwebtoken";
import Seller from "../Models/seller";
import twilioServices from "../Utils/twilioServices";
import { Utils } from "../Utils/utils";
import Admin from "../Models/admin";

export class adminController {
    static async login(req, res, next) {
        const admin = req.admin;
        try {
            const token = jwt.sign({ _id: admin._id, role: admin.role }, "secret", { expiresIn: '7d' });
            res.json({ token ,admin});
        } catch (e) {
            next(e);
        }
    }

    static async getAllUser(req, res, next) {
        try {
            const users = await Admin.find()
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    static async register(req, res, next) {
        try {

            const newUser = new Admin({
                mobile: req.body.mobile,
                role: 'admin',

            });

            await newUser.save();

            res.status(201).json({ status: true, newUser });

        } catch (e) {
            next(e);
        }
    }



}