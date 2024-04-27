export declare class Utils {
    MAX_TOKEN_TIME: number;
    multer: any;
    upload: any;
    static encryptPassword(password: string): Promise<any>;
    static comparePassword(password: {
        plainPassword: string;
        encryptedPassword: string;
    }): Promise<any>;
    static generateVerificationToken(size?: number): number;
    static formatDate(dateString: any): string;
    static calculateEndTime(durationString: any): Date;
}
