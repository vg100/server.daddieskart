
const twilio = require('twilio');
class TwilioServer {
  client: any;
  accountSid = "ACcd7fdbd7f8086bbd55dc9a8b8b44c936"
  authToken = "c73c6b1057dabd6c26db16df9cd0f7c6"
  twilioPhoneNumber = "+12058508306"
  constructor() {
    this.client = twilio(this.accountSid, this.authToken);
  }

  sendSMS(data) {
    try {
      const res = this.client.messages.create({
        to: data.to,
        from: this.twilioPhoneNumber,
        body: data.body
      });
      return res
    } catch (error) {
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

export default new TwilioServer();
