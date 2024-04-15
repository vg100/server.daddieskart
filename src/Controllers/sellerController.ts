import * as jwt from "jsonwebtoken";
import Seller from "../Models/seller";
import twilioServices from "../Utils/twilioServices";
import { Utils } from "../Utils/utils";

export class sellerController {
    static async register(req, res, next) {
        try {
            const existingUser = await Seller.findOne({ mobile: req.body.mobile });
            const verificationToken = Utils.generateVerificationToken();
            if (existingUser) {
                await twilioServices.sendSMS({
                    to: existingUser.mobile,
                    body: verificationToken
                })
                res.status(201).json({ status: true });
                return
            }
            const newUser = new Seller({
                ...req.body,
                verification_token: verificationToken,
            });

            await newUser.save();
            res.status(201).json({ status: true });  

        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        const user = req.user;
        try {
            const token = jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
            res.json({ token });
        } catch (e) {
            next(e);
        }
    }

    static async getAllSellers(req, res, next) {
        try {
            const users = await Seller.find()
            res.json(users);
        } catch (e) {
            next(e);
        }
    }
}