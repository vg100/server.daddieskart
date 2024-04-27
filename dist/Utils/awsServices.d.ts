declare class awsService {
    s3: any;
    bucketName: any;
    constructor();
    checkConnection(): Promise<void>;
    upload(file: any, callback: any): void;
    uploadFile(filePath: any, key: any, callback: any): void;
    deleteFile(key: any, callback: any): void;
}
declare const _default: awsService;
export default _default;
