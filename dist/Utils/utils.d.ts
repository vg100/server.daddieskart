export declare class Utils {
    static encryptPassword(password: string): Promise<any>;
    static comparePassword(password: {
        plainPassword: string;
        encryptedPassword: string;
    }): Promise<any>;
}
