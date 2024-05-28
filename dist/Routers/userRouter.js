"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = require("express");
const userValidators_1 = require("../Validators/userValidators");
const GlobalMiddleWare_1 = require("../GlobalMiddleWare/GlobalMiddleWare");
const userController_1 = require("../Controllers/userController");
class customerRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRouter();
        this.postRouter();
        this.patchRouter();
        this.deleteRouter();
    }
    getRouter() {
        this.router.get('/', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin", "buyer"]), userController_1.userController.getAllUser);
        this.router.get('/profile', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["buyer"]), userController_1.userController.getUserProfile);
        this.router.get('/get-address', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), userController_1.userController.getAddress);
    }
    postRouter() {
        this.router.post('/register', userValidators_1.userValidators.register(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, userController_1.userController.register);
        this.router.post('/login', userValidators_1.userValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, userController_1.userController.login);
        this.router.post('/sendotp', userController_1.userController.sendOtp);
        this.router.post('/verifyotp', userController_1.userController.verifyOtp);
        this.router.post('/add-address', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), userController_1.userController.addAddress);
        this.router.post('/edit-address', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(['buyer']), userController_1.userController.editAddress);
    }
    patchRouter() {
        this.router.patch('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin", "buyer"]), userValidators_1.userValidators.checkId(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, userController_1.userController.upadteUserProfile);
    }
    deleteRouter() {
        this.router.delete('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authMiddleware(["admin"]), userValidators_1.userValidators.checkId(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, userController_1.userController.deleteUserProfile);
    }
}
exports.customerRouter = customerRouter;
exports.default = new customerRouter().router;
