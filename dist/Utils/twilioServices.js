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
const twilio = require('twilio');
class TwilioServer {
    constructor() {
        this.accountSid = "ACcd7fdbd7f8086bbd55dc9a8b8b44c936";
        this.authToken = "cee66d9dece7c298288ae77cab5a03e2";
        this.twilioPhoneNumber = "+12058508306";
        this.client = twilio(this.accountSid, this.authToken);
    }
    sendSMS(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.client.messages.create({
                    to: data.phone,
                    from: this.twilioPhoneNumber,
                    body: `Your OTP is: ${data.otp}`
                });
                console.log(`OTP sent to ${data.phone}: ${message.sid}`);
                return message;
            }
            catch (error) {
                throw new Error('Error sending SMS: ' + error.message);
            }
        });
    }
    makePhoneCall(to, from, url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.calls.create({
                    to: to,
                    from: from,
                    url: url
                });
                return res;
            }
            catch (error) {
                throw new Error('Error making phone call: ' + error.message);
            }
        });
    }
    checkConnectivity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await this.sendSMS({
                //   to: '+919140994435',
                //   body: 'Testing Twilio connectivity.'
                // });
                // Try making a test call
                // await this.makePhoneCall('+1234567890', this.twilioPhoneNumber, 'http://demo.twilio.com/docs/voice.xml');
                return 'Twilio connectivity check successful.';
            }
            catch (error) {
                throw new Error('Twilio connectivity check failed: ' + error.message);
            }
        });
    }
}
exports.default = new TwilioServer();
