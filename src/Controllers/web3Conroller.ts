import { Request, Response, NextFunction } from 'express';
import BaseModel from "../Models/BaseModel";
import { PrismaClient } from '@prisma/client';
type ModelName = keyof PrismaClient;
class WorkerController {
    worker: BaseModel;

    constructor() {
        this.worker = new BaseModel("worker" as ModelName); // Fixed typo
    }

    balance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const userId: string = req.userId;

            // @ts-ignore
            const worker = await this.worker.getModel().findFirst(Number(userId))
            res.json({
                pendingAmount: worker?.pending_amount,
                lockedAmount: worker?.pending_amount,
            })
        } catch (e) {
            next(e);
        }
    }

    nextTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            const userId: string = req.userId;

            const task = await this.worker.getModel().findFirst({
                where: {
                    done: false,
                    submissions: {
                        none: {
                            worker_id: Number(userId)
                        }
                    }
                },
                select: {
                    id: true,
                    amount: true,
                    title: true,
                    options: true
                }
            })




            if (!task) {
                res.status(411).json({
                    message: "No more tasks left for you to review"
                })
            } else {
                res.json({
                    task
                })
            }

        } catch (e) {
            next(e);
        }
    };

    payout = async (req, res, next) => {

        try {
            const userId: string = req.userId;
            const worker = await this.worker.getModel().findFirst({
                where: { id: Number(userId) }
            })

            if (!worker) {
                return res.status(403).json({
                    message: "User not found"
                })
            }

        } catch (e) {
            next(e);
        }
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.query.id as string;
        try {
            const deletedUser = await this.worker.delete(Number(id)); // Fixed to use delete method
            res.status(200).json(deletedUser); // Changed status code to 200
        } catch (e) {
            next(e);
        }
    };

    dynamicHandler = async (req: Request, res: Response, next: NextFunction) => {
        const { functionname } = req.params;
        const method = (this as any)[functionname];
        if (typeof method !== 'function') {
            return res.status(404).json({ error: `Function ${functionname} not found on WorkerController` });
        }
        try {
            await method(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

class UserController {
    task: BaseModel;
    user: BaseModel;

    constructor() {
        this.task = new BaseModel("task" as ModelName);
        this.user = new BaseModel("user" as ModelName);
    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.user.find({}); // Changed to use user model
            res.status(200).json(users); // Changed status code to 200
        } catch (e) {
            next(e);
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await this.user.save(req.body); // Changed to use user model
            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.query.id as string;
        try {
            const updatedUser = await this.user.findByIdAndUpdate(Number(id), req.body); // Changed to use user model
            res.status(200).json(updatedUser); // Changed status code to 200
        } catch (e) {
            next(e);
        }
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.query.id as string;
        try {
            const deletedUser = await this.user.delete(Number(id)); // Changed to use user model and delete method
            res.status(200).json(deletedUser); // Changed status code to 200
        } catch (e) {
            next(e);
        }
    };

    dynamicHandler = async (req: Request, res: Response, next: NextFunction) => {
        const { functionname } = req.params;
        const method = (this as any)[functionname];
        if (typeof method !== 'function') {
            return res.status(404).json({ error: `Function ${functionname} not found on UserController` });
        }
        try {
            await method(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

export const workersController = new WorkerController();
export const usersController = new UserController();
