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
exports.update = exports.query = exports.insert = exports.setUpDB = void 0;
const sdk_1 = require("@tableland/sdk");
const ethers_1 = require("ethers");
const experimental_1 = require("@ethersproject/experimental");
require("dotenv").config();
const privateKey = process.env.TABLELAND_PRIVATE_KEY;
const setUpDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = new ethers_1.Wallet(privateKey);
<<<<<<< Updated upstream
    const provider = new ethers_1.providers.JsonRpcProvider(process.env.MUMBAI_RPC); // Local tableland or polygonMumbai
    const baseSigner = wallet.connect(provider);
    const signer = new experimental_1.NonceManager(baseSigner); // Using nonceManager to handle local tableland node
    // Default to grabbing a wallet connection in a browser
    const db = new sdk_1.Database({ signer });
=======
    const provider = new ethers_1.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_MUMBAI_RPC); // Local tableland or polygonMumbai
    const signer = wallet.connect(provider);
    const db = new sdk_1.Database({ signer, autoWait: true });
>>>>>>> Stashed changes
    return db;
});
exports.setUpDB = setUpDB;
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
const insert = (db, statement, values) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Insert row into a table
        const { meta: insert } = yield db.prepare(statement).bind(values).run();
        // wait for tx finality
        yield ((_a = insert.txn) === null || _a === void 0 ? void 0 : _a.wait());
        // return the insert
        return insert;
    }
    catch (e) {
        console.log(e);
        return e;
    }
});
exports.insert = insert;
const query = (db, statement) => __awaiter(void 0, void 0, void 0, function* () {
    const { results } = yield db.prepare(statement)
        .all();
    return (results);
});
exports.query = query;
const update = (db, statement, values) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // Update a row into the table
        const { meta: update } = yield db
            .prepare(statement)
            .bind(...values)
            .run();
        // Wait for transaction finality
        yield ((_b = update.txn) === null || _b === void 0 ? void 0 : _b.wait());
        // Return the updated row's ID
        return update;
    }
    catch (e) {
        console.log("error:" + e);
        return "error";
    }
});
exports.update = update;
