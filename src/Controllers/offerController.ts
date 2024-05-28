import Category from '../Models/category'
import product from '../Models/product';
import Offer from '../Models/offer';
import awsServices from '../Utils/awsServices';
import SocketManager from '../Utils/soket';



export class offerController {
  static async getOffer(req, res, next) {
    const user=req.buyer._id
    try {
        const offers = await Offer.find({...req.body,user});
        res.status(200).json(offers);
    } catch (e) {
        next(e);
    }
  }
  static async createOffer(req, res, next) {
    try {
        const { offer } = req.body;
        const newOffer = {
            amount: offer,
            user: req.buyer._id,
            product:req.params.productId
        };
        const products = new Offer(newOffer);
         await products.save();

        SocketManager.io.emit('newOffer', newOffer);
        res.status(200).json({ message: 'Bargaining request sent' });

    } catch (e) {
        next(e);
    }
  }


}