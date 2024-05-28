
import User from '../Models/user'
import * as bcrypt from 'bcrypt'
import * as Jwt from 'jsonwebtoken';
import twilioServices from '../Utils/twilioServices';
import { Utils } from '../Utils/utils';
import awsServices from '../Utils/awsServices';
import Address from '../Models/address';

export class userController {

    static async register(req, res, next) {

        try {
            const existingUser = await User.findOne({ mobile: req.body.mobile });
            if (existingUser) {
                if (existingUser.verified) {
                    throw new Error("User is already registered and verified")
                } else {
                    const otp = Utils.generateVerificationToken();
                    existingUser.otp = otp;
                    existingUser.otpExpiration = Date.now() + 600000;
                    await existingUser.save();
                    await twilioServices.sendSMS({ phone: req.body.mobile, otp });
                    return res.status(200).json({ status: true });
                }
            }
            const otp = Utils.generateVerificationToken()
            const newUser = new User({
                mobile: req.body.mobile,
                otp,
                otpExpiration: Date.now() + 600000,
                role: 'buyer',
            });
            await newUser.save();
            await twilioServices.sendSMS({
                phone: req.body.mobile,
                otp,
            })
            res.status(201).json({ status: true, });
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

    static async sendOtp(req, res, next) {
        const mobile = req.body.mobile;
        try {
            const otp = Utils.generateVerificationToken()
            const user = await User.findOneAndUpdate(
                { mobile },
                {
                    otp,
                    otpExpiration: Date.now() + 600000
                },
                { upsert: true, new: true }
            );

            await twilioServices.sendSMS({
                phone: mobile,
                otp,
            })

            res.status(200).json({ success: true, message: 'OTP sent successfully' });

        } catch (e) {
            next(e);
        }
    }

    static async verifyOtp(req, res, next) {
        const otp = req.body.otp;
        const mobile = req.body.mobile;
        try {
            const user = await User.findOne({ mobile, otp });
            if (!user || user.otpExpiration < Date.now()) {
                throw new Error("Invalid OTP")
            }
            user.otp = undefined;
            user.otpExpiration = undefined;
            user.verified = true
            await user.save();
            const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
            res.json({ token, user });
        } catch (e) {
            next(e);
        }
    }

    static async addAddress(req, res, next) {

        try {

            const addess = new Address({ shippingInfo: req.body, user: req.buyer._id });
            const updatedUser = await User.findByIdAndUpdate(
                req.buyer._id,
                { $push: { address: addess._id } },
                { new: true }
            );
            await Promise.all([addess.save(), updatedUser.save()]);
            res.status(201).json({
                message: "added sucessfully"
            });
        } catch (e) {
            next(e);
        }
    }

    static async editAddress(req, res, next) {
        try {
            const { _id, ...updateFields } = req.body;
           

          const dd=  await Address.findByIdAndUpdate(
                _id,
                {shippingInfo:updateFields},
                { new: true, runValidators: true }
            );
            res.status(201).json({
                message: "updaded sucessfully"
            });
        } catch (e) {
            next(e);
        }
    }
    static async getAddress(req, res, next) {

        try {
            const address = await Address.find({ user: req.buyer._id });
            res.status(201).json(address);
        } catch (e) {
            next(e);
        }
    }
}

