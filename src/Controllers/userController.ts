
import User from '../Models/user'
import * as bcrypt from 'bcrypt'
import * as Jwt from 'jsonwebtoken';
import twilioServices from '../Utils/twilioServices';
import { Utils } from '../Utils/utils';
import awsServices from '../Utils/awsServices';

export class userController {

    static async register(req, res, next) {
        try {

            const newUser = new User({
                mobile: req.body.mobile,
                role: 'buyer',

            });

            await newUser.save();
            await twilioServices.sendSMS({
                to: req.body.mobile,
                body: "Welcome to daddiesKart ◡̈ "
            })
            res.status(201).json({ status: true, newUser });

        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        const user = req.user;

        try {
            const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
            res.json({ token, user });
        } catch (e) {
            next(e);
        }

    }

    static async getAllUser(req, res, next) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    static async getUserProfile(req, res, next) {
        try {
            const user = await User.findById(req.user._id);
            res.json(user);
        } catch (e) {
            next(e);

        }
    }

    static async upadteUserProfile(req, res, next) {
        try {
            const users = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.json(users);
        } catch (e) {
            next(e);
        }



    }
    static async deleteUserProfile(req, res, next) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.json({
                msg: "deleted sucessfully"
            });
        } catch (e) {
            next(e);
        }
    }

    static async verify(req, res, next) {
        const verificationToken = req.body.verification_token;
        const mobile = req.body.mobile;
        try {
            const user = await User.findOneAndUpdate({
                mobile: mobile,
                verification_token: verificationToken
            }, { verified: true, updated_at: new Date() }, { new: true });
            if (user) {
                const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
                res.json({ token });
            } else {
                throw new Error('Verification Token Is Expired.Please Request For a new One');
            }
        } catch (e) {
            next(e);
        }
    }
    static async resendVerificationOtp(req, res, next) {
        const mobile = req.user.mobile;
        const verificationToken = Utils.generateVerificationToken();
        try {
            const user: any = await User.findOneAndUpdate({ mobile: mobile }, {
                verification_token: verificationToken,
            });
            if (user) {
                await twilioServices.sendSMS({
                    to: "+919555504027",
                    body: verificationToken
                })
                res.json({ success: true })
            } else {
                throw new Error('User Does Not Exist');
            }
        } catch (e) {
            next(e);
        }
    }

}

