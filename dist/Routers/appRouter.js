"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
class appRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
    }
    getRouter() {
        this.router.get('/', (req, res, next) => {
            res.send({
                appName: "the factory",
                status: "UP"
            });
        });
    }
}
exports.appRouter = appRouter;
exports.default = new appRouter().router;
