"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const Bcrypt = require("bcrypt");
const Multer = require("multer");
const path = require("path");
const storageOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
class Utils {
    constructor() {
        this.MAX_TOKEN_TIME = 600000;
        this.multer = Multer({ storage: storageOptions });
        this.upload = Multer({ dest: './src/uploads/' });
    }
    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
    static comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(((resolve, reject) => {
                Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                    if (err) {
                        reject(err);
                    }
                    else if (!isSame) {
                        reject(new Error('User and Password Does not Match'));
                    }
                    else {
                        resolve(true);
                    }
                }));
            }));
        });
    }
    static generateVerificationToken(size = 6) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }
    static formatDate(dateString) {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        const paddedDay = day < 10 ? '0' + day : day;
        return `Get it by ${paddedDay} ${month}, ${year}`;
    }
    ;
    static calculateEndTime(durationString) {
        const durationParts = durationString.match(/\d+\s*[dhms]/g);
        console.log('Duration parts:', durationParts);
        if (!durationParts) {
            throw new Error('Invalid duration format');
        }
        let duration = 0;
        for (let i = 0; i < durationParts.length; i++) {
            const durationPart = durationParts[i];
            const match = durationPart.match(/(\d+)\s*([dhms])/);
            if (!match) {
                throw new Error('Invalid duration format');
            }
            const value = parseInt(match[1]);
            const unit = match[2];
            console.log('Value:', value);
            console.log('Unit:', unit);
            if (unit === 'd') {
                duration += value * 24 * 60 * 60 * 1000; // Convert days to milliseconds
            }
            else if (unit === 'h') {
                duration += value * 60 * 60 * 1000; // Convert hours to milliseconds
            }
            else if (unit === 'm') {
                duration += value * 60 * 1000; // Convert minutes to milliseconds
            }
            else if (unit === 's') {
                duration += value * 1000; // Convert seconds to milliseconds
            }
        }
        const endTime = new Date(Date.now() + duration);
        return endTime;
    }
    ;
}
exports.Utils = Utils;
