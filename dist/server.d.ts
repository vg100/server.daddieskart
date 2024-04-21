/// <reference types="node" />
import * as express from 'express';
import * as http from 'http';
export declare class Server {
    logger: any;
    app: express.Application;
    server: http.Server;
    io: any;
    constructor();
    createLogger(): import("winston").Logger;
    setConfiguration(): void;
    connectsqlDB(): void;
    connectToS3Bucket(): Promise<void>;
    connectToTwilio(): Promise<void>;
    connectMongoDB(): Promise<void>;
    configureBodyParser(): void;
    enableCors(): void;
    handlebarsTemplate(): void;
    configureSocketIO(): void;
    setRouter(): void;
    handleErrors(): void;
    error404Handler(): void;
}
