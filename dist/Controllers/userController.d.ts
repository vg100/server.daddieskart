export declare class userController {
    static register(req: any, res: any, next: any): Promise<any>;
    static login(req: any, res: any, next: any): Promise<void>;
    static getAllUser(req: any, res: any, next: any): Promise<void>;
    static getUserProfile(req: any, res: any, next: any): Promise<void>;
    static upadteUserProfile(req: any, res: any, next: any): Promise<void>;
    static deleteUserProfile(req: any, res: any, next: any): Promise<void>;
    static sendOtp(req: any, res: any, next: any): Promise<void>;
    static verifyOtp(req: any, res: any, next: any): Promise<void>;
    static addAddress(req: any, res: any, next: any): Promise<void>;
    static editAddress(req: any, res: any, next: any): Promise<void>;
    static getAddress(req: any, res: any, next: any): Promise<void>;
}
