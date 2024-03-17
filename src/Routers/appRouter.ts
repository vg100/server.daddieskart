import { Router } from 'express'

export class appRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.getRouter();
    }

    getRouter() {
        this.router.get('/',(req, res, next)=>{
           res.send({
            appName:"the factory",
            status:"UP"
           })
        })
    }
}

export default new appRouter().router