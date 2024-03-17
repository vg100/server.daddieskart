export declare class orderController {
    static createOrder(req: any, res: any, next: any): Promise<void>;
    static getAllOrders(req: any, res: any, next: any): Promise<void>;
    static getOrdersByUserId(req: any, res: any, next: any): Promise<void>;
    static getOrdersByStatus(req: any, res: any, next: any): Promise<void>;
    static getOrdersById(req: any, res: any, next: any): Promise<any>;
    static updateOrder(req: any, res: any, next: any): Promise<any>;
    static deleteOrder(req: any, res: any, next: any): Promise<any>;
}
