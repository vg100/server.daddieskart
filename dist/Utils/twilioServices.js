"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio = require('twilio');
class TwilioServer {
    constructor() {
        this.accountSid = "ACcd7fdbd7f8086bbd55dc9a8b8b44c936";
        this.authToken = "c73c6b1057dabd6c26db16df9cd0f7c6";
        this.twilioPhoneNumber = "+12058508306";
        this.client = twilio(this.accountSid, this.authToken);
    }
    sendSMS(data) {
        try {
            const res = this.client.messages.create({
                to: data.to,
                from: this.twilioPhoneNumber,
                body: data.body
            });
            return res;
        }
        catch (error) {
            throw new Error('Error sending SMS:');
        }
    }
    makePhoneCall(to, from, url) {
        return this.client.calls.create({
            to: to,
            from: from,
            url: url
        });
    }
}
exports.default = new TwilioServer();
