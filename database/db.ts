import { Database, Statement } from "@tableland/sdk";
import { Wallet, providers } from "ethers";
import { NonceManager } from "@ethersproject/experimental";
require("dotenv").config()

const privateKey = process.env.TABLELAND_PRIVATE_KEY;

export const setUpDB = async () => {
    const wallet = new Wallet(privateKey!);
    const provider = new providers.JsonRpcProvider(process.env.MUMBAI_RPC); // Local tableland or polygonMumbai
    const baseSigner = wallet.connect(provider);
    const signer = new NonceManager(baseSigner); // Using nonceManager to handle local tableland node
  
    // Default to grabbing a wallet connection in a browser
    const db = new Database({signer});

    return db
}
/*
// Now we are creating tables via Tableland Studio
export const createScoreboardTable = async (db: Database, gameName: string) => {
    console.log("creating table for game: ", gameName);
    const { meta: createScoreboard } = await db.prepare(
        `CREATE TABLE ${gameName} (
            id int NOT NULL AUTO_INCREMENT,
            wallet TEXT,
            score int NOT NULL,
            PRIMARY KEY (id, wallet)
        )`
    ).run();

    const { name: scoreboard } = createScoreboard.txn!;

    return scoreboard;
}

export const createPersonalInfoTable = async (db: Database) => {
    console.log("creating personal infos table");
    const { meta: createPersonalInfos } = await db.prepare(
        `CREATE TABLE personalInfos (
            wallet TEXT PRIMARY KEY,
            email TEXT,
            balance int,
        )`
    ).run();

    const { name: personalInfos } = createPersonalInfos.txn!;

    return personalInfos;
}
*/
export const insert = async (
    db: Database,
    statement: string,
    values: any[]
) => {
    try {
    // Insert row into a table
    const { meta: insert } = await db.prepare(statement).bind(values).run(); 
    // wait for tx finality
    await insert.txn?.wait();
    // return the insert
    return insert;
    } catch (e) {
    console.log(e);
    return e;
    }
}
export const query = async (
    db: Database,
    statement: string
) => {
    const {results} = await db.prepare(statement)
    .all();

    return(results);
};

export const update = async (
    db: Database,
    statement: string,
    values: any[]
) => {
    try {
    // Update a row into the table
    const { meta: update } = await db
        .prepare(statement)
        .bind(...values)
        .run();
    
    // Wait for transaction finality
    await update.txn?.wait();
    
    // Return the updated row's ID
    return update;
    } catch (e) {
        console.log("error:" + e);
        return "error";
    }
}