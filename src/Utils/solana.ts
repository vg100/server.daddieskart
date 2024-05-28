import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { decode } from "bs58";

class Solana {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async processTransaction(worker: { address: string, pending_amount: number }, privateKey: string, res: any) {
        const TOTAL_DECIMALS = 1_000_000_000; 
        const fromPublicKey = new PublicKey("2KeovpYvrgpziaDsq8nbNMP4mc48VNBVXb5arbqrg9Cq");
        const toPublicKey = new PublicKey(worker.address);
        const lamports = 1_000_000_000 * worker.pending_amount / TOTAL_DECIMALS;

        // Create the transaction
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: fromPublicKey,
                toPubkey: toPublicKey,
                lamports: lamports,
            })
        );

        // Decode the private key
        const keypair = Keypair.fromSecretKey(decode(privateKey));

        // TODO: Implement a mechanism to prevent double spending
        // Example: Track transaction status using a simple in-memory store or a database
        const transactionStore: { [key: string]: boolean } = {};

        // Check if the transaction has already been processed
        if (transactionStore[worker.address]) {
            return res.json({
                message: "Transaction already processed"
            });
        }

        let signature = "";
        try {
            signature = await sendAndConfirmTransaction(
                this.connection,
                transaction,
                [keypair],
            );

            // Mark the transaction as processed
            transactionStore[worker.address] = true;

            return res.json({
                message: "Transaction successful",
                signature: signature
            });
        } catch (e) {
            return res.json({
                message: "Transaction failed",
                error: e.toString()
            });
        }
    }
}

export default Solana;
