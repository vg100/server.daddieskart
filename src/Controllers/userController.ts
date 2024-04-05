
import User from '../Models/user'
import * as bcrypt from 'bcrypt'
import * as Jwt from 'jsonwebtoken';
import twilioServices from '../Utils/twilioServices';
import { Utils } from '../Utils/utils';
import awsServices from '../Utils/awsServices';

export class userController {
    static otp = ""
    static updateOTP(newOTP) {
        this.otp = newOTP;
    }
    static async register(req, res, next) {
        try {
            const existingUser = await User.findOne({ mobile: req.body.mobile });
            const verificationToken = Utils.generateVerificationToken();
            if (existingUser) {

                await twilioServices.sendSMS({
                    to: existingUser.mobile,
                    body: verificationToken
                })
                res.status(201).json({ status: true });
                return
            }

            // const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // const newUser = new User({
            //     username: req.body.username,
            //     email: req.body.email,
            //     password: hashedPassword,
            //     role: req.body.role || 'buyer',
            //     profileImage: req.body.profileImage,
            //     contactInfo: req.body.contactInfo
            // });

            const newUser = new User({
                mobile: req.body.mobile,
                verification_token: verificationToken,
                role: req.body.role || 'buyer',

            });

            await newUser.save();
            res.status(201).json({ status: true });
            await twilioServices.sendSMS({
                to: req.body.mobile,
                body: verificationToken
            })
  

        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        const user = req.user;
        try {
            // const verificationToken = Utils.generateVerificationToken();
            // await twilioServices.sendSMS({
            //     to: req.body.mobile,
            //     body: verificationToken
            // })
            // this.updateOTP(verificationToken)
            // res.status(201).json({ status: true });
            const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });
            res.json({ token });
        } catch (e) {
            next(e);
        }
    }

    static async getAllUser(req, res, next) {
        try {
            const users = await User.find().populate({
                path: 'Permissions',
                select: 'name price'
            })
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
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            Object.assign(user, req.body);
            const updatedUser = await user.save();
            res.json(updatedUser);
        } catch (e) {
            next(e);

        }



    }
    static async deleteUserProfile(req, res, next) {
        try {

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

