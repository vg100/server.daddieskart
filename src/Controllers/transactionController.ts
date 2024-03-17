
import Transaction from "../Models/transaction";

export class transactionController{
 static async createTransaction(req,res,next){

    try {
      
        const transaction = new Transaction(req.body);
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (e) {
        next(e);
    }
 }

 static async getAllTransaction(req,res,next){

    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (e) {
        next(e);
    }
 }

 static async getTransactionByType(req,res,next){
    const transactionType = req.params.type;
    try {
        const transactions = await Transaction.find({ type: transactionType });
    res.json(transactions);
    } catch (e) {
        next(e);
    }
 }

}