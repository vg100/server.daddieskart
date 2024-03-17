export declare class notificationController {
    static createNotification(req: any, res: any, next: any): Promise<void>;
    static getAllNotification(req: any, res: any, next: any): Promise<void>;
    static getUnreadlNotification(req: any, res: any, next: any): Promise<void>;
    static markaNotificationAsRead(req: any, res: any, next: any): Promise<any>;
    static deleteNotification(req: any, res: any, next: any): Promise<any>;
}
