export declare class GlobalMiddleWare {
    static checkError(req: any, res: any, next: any): void;
    static authenticate(req: any, res: any, next: any): Promise<void>;
    static authMiddleware: (allowedRoles: any) => (req: any, res: any, next: any) => void;
}
