import * as express from 'express';
import { PrismaClient } from '@prisma/client';
export declare class Server {
    logger: any;
    app: express.Application;
    prisma: PrismaClient;
    constructor();
    generateSwaggerDocumentation(): void;
    createLogger(): import("winston").Logger;
    setConfiguration(): void;
    connectPrisma(): Promise<void>;
    connectsqlDB(): void;
    connectToS3Bucket(): Promise<void>;
    connectToTwilio(): Promise<void>;
    connectMongoDB(): Promise<void>;
    configureBodyParser(): void;
    enableCors(): void;
    handlebarsTemplate(): void;
    setRouter(): void;
    handleErrors(): void;
    error404Handler(): void;
}
