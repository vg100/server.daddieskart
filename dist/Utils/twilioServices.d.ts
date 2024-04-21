declare class TwilioServer {
    client: any;
    accountSid: string;
    authToken: string;
    twilioPhoneNumber: string;
    constructor();
    sendSMS(data: any): Promise<any>;
    makePhoneCall(to: any, from: any, url: any): Promise<any>;
    checkConnectivity(): Promise<string>;
}
declare const _default: TwilioServer;
export default _default;
