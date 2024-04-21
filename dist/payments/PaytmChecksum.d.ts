declare class PaytmChecksum {
    static encrypt(input: any, key: any): string;
    static decrypt(encrypted: any, key: any): string;
    static generateSignature(params: any, key: any): Promise<string>;
    static verifySignature(params: any, key: any, checksum: any): boolean | Promise<never>;
    static generateSignatureByString(params: any, key: any): Promise<string>;
    static verifySignatureByString(params: any, key: any, checksum: any): boolean;
    static generateRandomString(length: any): Promise<unknown>;
    static getStringByParams(params: any): string;
    static calculateHash(params: any, salt: any): string;
    static calculateChecksum(params: any, key: any, salt: any): string;
}
export default PaytmChecksum;
