const twilio = require('twilio');

class TwilioServer {
  client: any;
  accountSid = "ACcd7fdbd7f8086bbd55dc9a8b8b44c936"
  authToken = "cee66d9dece7c298288ae77cab5a03e2"
  twilioPhoneNumber = "+12058508306"
  
  constructor() {
    this.client = twilio(this.accountSid, this.authToken);
  }

  async sendSMS(data) {
    try {
      const res = await this.client.messages.create({
        to: data.to,
        from: this.twilioPhoneNumber,
        body: data.body
      });
      return res;
    } catch (error) {
      throw new Error('Error sending SMS: ' + error.message);
    }
  }

  async makePhoneCall(to, from, url) {
    try {
      const res = await this.client.calls.create({
        to: to,
        from: from,
        url: url
      });
      return res;
    } catch (error) {
      throw new Error('Error making phone call: ' + error.message);
    }
  }

  async checkConnectivity() {
    try {
      // await this.sendSMS({
      //   to: '+919140994435',
      //   body: 'Testing Twilio connectivity.'
      // });
      
      // Try making a test call
      // await this.makePhoneCall('+1234567890', this.twilioPhoneNumber, 'http://demo.twilio.com/docs/voice.xml');
      
      return 'Twilio connectivity check successful.';
    } catch (error) {
      throw new Error('Twilio connectivity check failed: ' + error.message);
    }
  }
}

export default new TwilioServer();
