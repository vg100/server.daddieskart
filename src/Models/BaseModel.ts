import { PrismaClient } from '@prisma/client';

type ModelName = keyof PrismaClient;

class BaseModel {
    protected prisma: PrismaClient;
    protected modelName: ModelName;

    constructor(modelName: ModelName) {
        this.prisma = new PrismaClient();
        this.modelName = modelName;
    }

    getModel() {
        return this.prisma[this.modelName] as any;
    }

    async findById<T extends { id: number }>(id: number): Promise<T | null> {
        return this.getModel().findUnique({
            where: { id },
        });
    }

    async find<T>({ where, orderBy, skip, take, include }: { where?: any; orderBy?: any; skip?: number; take?: number; include?: any }): Promise<T[]> {
        return this.getModel().findMany({ where, orderBy, skip, take, include });
    }

    async save<T>(data: any): Promise<T> {
        return this.getModel().create({ data });
    }

    async update<T>(id: number, data: any, { include }: { include?: any } = {}): Promise<T | null> {
        return this.getModel().update({
            where: { id },
            data,
            include,
        });
    }

    async delete<T>(id: number, { include }: { include?: any } = {}): Promise<T | null> {
        return this.getModel().delete({
            where: { id },
            include,
        });
    }

    async findByIdAndUpdate<T>(id: any, data: any): Promise<T | null> {
        const existingItem = await this.findById<any>(id);
        if (existingItem) {
            return this.update<T>(id, data);
        }
        return null;
    }

    async findOneAndUpdate<T>(filter: any, data: any): Promise<T | null> {
        const existingItem = await this.findOne<any>(filter);
        if (existingItem) {
            return this.update<T>(existingItem.id, data);
        }
        return null;
    }

    async findOne<T>({ where, include }: { where: any; include?: any }): Promise<T | null> {
        return this.getModel().findUnique({ where, include });
    }

    async count<T>({ where }: { where?: any } = {}): Promise<number> {
        return this.getModel().count({ where });
    }

    async aggregate<T>(options: any): Promise<T> {
        return this.getModel().aggregate(options);
    }
}

export default BaseModel;
