
import User from '../Models/user'
import * as bcrypt from 'bcrypt'
import * as Jwt from 'jsonwebtoken';

export class userController {
    static async register(req, res, next) {
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Create a new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role || 'buyer', // Set default role if not provided
                profileImage: req.body.profileImage,
                contactInfo: req.body.contactInfo
            });

            // Save the user to the database
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (e) {
            next(e);

        }



    }

    static async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = Jwt.sign({ _id: user._id, role: user.role }, "secret", { expiresIn: '7d' });

            res.json({ token });

        } catch (e) {
            next(e);

        }



    }

    static async getAllUser(req, res, next) {
        try {
            const users = await User.find();
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
}