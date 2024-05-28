import { PrismaClient } from '@prisma/client';
declare type ModelName = keyof PrismaClient;
declare class BaseModel {
    protected prisma: PrismaClient;
    protected modelName: ModelName;
    constructor(modelName: ModelName);
    getModel(): any;
    findById<T extends {
        id: number;
    }>(id: number): Promise<T | null>;
    find<T>({ where, orderBy, skip, take, include }: {
        where?: any;
        orderBy?: any;
        skip?: number;
        take?: number;
        include?: any;
    }): Promise<T[]>;
    save<T>(data: any): Promise<T>;
    update<T>(id: number, data: any, { include }?: {
        include?: any;
    }): Promise<T | null>;
    delete<T>(id: number, { include }?: {
        include?: any;
    }): Promise<T | null>;
    findByIdAndUpdate<T>(id: any, data: any): Promise<T | null>;
    findOneAndUpdate<T>(filter: any, data: any): Promise<T | null>;
    findOne<T>({ where, include }: {
        where: any;
        include?: any;
    }): Promise<T | null>;
    count<T>({ where }?: {
        where?: any;
    }): Promise<number>;
    aggregate<T>(options: any): Promise<T>;
}
export default BaseModel;
