"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const adminValidators_1 = require("../Validators/adminValidators");
const adminController_1 = require("../Controllers/adminController");
class adminRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', adminController_1.adminController.getAllUser);
    }
    postRouter() {
        this.router.post('/login', adminValidators_1.adminValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, adminController_1.adminController.login);
        this.router.post('/register', adminController_1.adminController.register);
    }
    patchRouter() {
    }
    deleteRouter() {
    }
}
exports.adminRouter = adminRouter;
exports.default = new adminRouter().router;
