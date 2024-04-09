

import Stores from '../Models/stores';



export class storeController {
    static async getStores(req, res, next) {
        try {
            const stores = await Stores.find()
            res.json(stores);
        } catch (e) {
            console.log(e)
            next(e);
        }
    }
    static async addStores(req, res, next) {
        try {
            const stores = new Stores(req.body);
            const newStore = await stores.save();
            res.json(newStore);
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

   
}