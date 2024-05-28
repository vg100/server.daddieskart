import { Request, Response, NextFunction } from 'express';
import BaseModel from "../Models/BaseModel";
declare class WorkerController {
    worker: BaseModel;
    constructor();
    balance: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    nextTask: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    payout: (req: any, res: any, next: any) => Promise<any>;
    deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    dynamicHandler: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
}
declare class UserController {
    task: BaseModel;
    user: BaseModel;
    constructor();
    getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    dynamicHandler: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
}
export declare const workersController: WorkerController;
export declare const usersController: UserController;
export {};
