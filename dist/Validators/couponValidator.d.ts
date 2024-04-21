export declare class couponValidators {
    static validateCoupon(): (import("express-validator").ValidationChain | ((req: any, res: any, next: any) => Promise<void>))[];
    static applyCoupon(): (import("express-validator").ValidationChain | ((req: any, res: any, next: any) => Promise<boolean>))[];
    static createCoupon(): import("express-validator").ValidationChain[];
}
