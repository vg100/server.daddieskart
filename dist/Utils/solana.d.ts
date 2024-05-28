import { Connection } from "@solana/web3.js";
declare class Solana {
    private connection;
    constructor(connection: Connection);
    processTransaction(worker: {
        address: string;
        pending_amount: number;
    }, privateKey: string, res: any): Promise<any>;
}
export default Solana;
