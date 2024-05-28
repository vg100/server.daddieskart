export declare class GlobalMiddleWare {
    requestInfo: any;
    static checkError(req: any, res: any, next: any): void;
    static authMiddleware: (allowedRoles: any) => (req: any, res: any, next: any) => void;
}
