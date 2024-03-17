import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfiguration(): void;
    connectsqlDB(): void;
    connectMongoDB(): Promise<void>;
    configureBodyParser(): void;
    enableCors(): void;
    handlebarsTemplate(): void;
    setRouter(): void;
    handleErrors(): void;
    error404Handler(): void;
}
