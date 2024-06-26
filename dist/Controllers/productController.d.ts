export declare class productController {
    static getAllProducts(req: any, res: any, next: any): Promise<void>;
    static getProductsById(req: any, res: any, next: any): Promise<any>;
    static createProduct(req: any, res: any, next: any): Promise<void>;
    static updateProduct(req: any, res: any, next: any): Promise<any>;
    static deleteProduct(req: any, res: any, next: any): Promise<any>;
    static topProduct(req: any, res: any, next: any): Promise<void>;
    static getProductsByCategoryId(req: any, res: any, next: any): Promise<void>;
    static searchProducts(req: any, res: any, next: any): Promise<any>;
    static check_pincode(req: any, res: any, next: any): Promise<any>;
}
