export declare class userController {
    static register(req: any, res: any, next: any): Promise<void>;
    static login(req: any, res: any, next: any): Promise<void>;
    static getAllUser(req: any, res: any, next: any): Promise<void>;
    static getUserProfile(req: any, res: any, next: any): Promise<void>;
    static upadteUserProfile(req: any, res: any, next: any): Promise<void>;
    static deleteUserProfile(req: any, res: any, next: any): Promise<void>;
    static verify(req: any, res: any, next: any): Promise<void>;
    static resendVerificationOtp(req: any, res: any, next: any): Promise<void>;
}
