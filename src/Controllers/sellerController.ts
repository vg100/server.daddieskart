import * as jwt from "jsonwebtoken";
import Seller from "../Models/seller";
import twilioServices from "../Utils/twilioServices";
import { Utils } from "../Utils/utils";

export class sellerController {
    static async register(req, res, next) {
        try {
    

            const newUser = new Seller({
                ...req.body,
            });

          const seller= await newUser.save();
            await twilioServices.sendSMS({
                    to: req.body.mobile,
                    body: "Welcome to daddiesKart ◡̈ "
                })
            res.status(201).json({ status: true,seller });  



            // const verificationToken = Utils.generateVerificationToken();
            // if (existingUser) {
            //     await twilioServices.sendSMS({
            //         to: existingUser.mobile,
            //         body: verificationToken
            //     })
            //     res.status(201).json({ status: true });
            //     return
            // }
         

        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        const seller = req.seller;
        try {
            const token = jwt.sign({ _id: seller._id, role: seller.role }, "secret", { expiresIn: '7d' });
            res.json({ token ,seller});
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

    static async upadteSellerProfile(req, res, next){
        try {
            const users = await Seller.findByIdAndUpdate(req.params.id,req.body,{ new: true })
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    static async deleteSeller(req,res,next){
        const seller=req.seller
        try {
            await Seller.findByIdAndDelete(seller?._id);
            res.json({
                msg:"deleted sucessfully"
            });
        } catch (e) {
            next(e);
        }
    }
}