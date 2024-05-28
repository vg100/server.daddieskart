"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = require("bs58");
class Solana {
    constructor(connection) {
        this.connection = connection;
    }
    processTransaction(worker, privateKey, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const TOTAL_DECIMALS = 1000000000;
            const fromPublicKey = new web3_js_1.PublicKey("2KeovpYvrgpziaDsq8nbNMP4mc48VNBVXb5arbqrg9Cq");
            const toPublicKey = new web3_js_1.PublicKey(worker.address);
            const lamports = 1000000000 * worker.pending_amount / TOTAL_DECIMALS;
            // Create the transaction
            const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                fromPubkey: fromPublicKey,
                toPubkey: toPublicKey,
                lamports: lamports,
            }));
            // Decode the private key
            const keypair = web3_js_1.Keypair.fromSecretKey(bs58_1.decode(privateKey));
            // TODO: Implement a mechanism to prevent double spending
            // Example: Track transaction status using a simple in-memory store or a database
            const transactionStore = {};
            // Check if the transaction has already been processed
            if (transactionStore[worker.address]) {
                return res.json({
                    message: "Transaction already processed"
                });
            }
            let signature = "";
            try {
                signature = yield web3_js_1.sendAndConfirmTransaction(this.connection, transaction, [keypair]);
                // Mark the transaction as processed
                transactionStore[worker.address] = true;
                return res.json({
                    message: "Transaction successful",
                    signature: signature
                });
            }
            catch (e) {
                return res.json({
                    message: "Transaction failed",
                    error: e.toString()
                });
            }
        });
    }
}
exports.default = Solana;
