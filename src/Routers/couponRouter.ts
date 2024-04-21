import {Router} from 'express'

import { GlobalMiddleWare } from '../GlobalMiddleWare/GlobalMiddleWare';
import { categoryController } from '../Controllers/categoryController';
import { Utils } from '../Utils/utils';
import { couponValidators } from '../Validators/couponValidator';
import { couponController } from '../Controllers/couponController';
export class couponRouter{
     router:Router;
    constructor(){
        this.router=Router();
        this.getRouter();
        this.postRouter();
    }

    getRouter(){
       this.router.get('/',couponController.getAllCoupon)      
    }
    postRouter(){
        this.router.post('/',couponValidators.createCoupon(), GlobalMiddleWare.checkError,couponController.createCoupon);
        this.router.post('/validate-coupon',couponController.validateCoupon);
        this.router.post('/apply-coupon',couponController.applyCoupon);
      
    }
  
}

export default new couponRouter().router