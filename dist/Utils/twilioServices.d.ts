declare class TwilioServer {
    client: any;
    accountSid: string;
    authToken: string;
    twilioPhoneNumber: string;
    constructor();
    sendSMS(data: any): any;
    makePhoneCall(to: any, from: any, url: any): any;
}
declare const _default: TwilioServer;
export default _default;
