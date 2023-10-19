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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const privateKey = process.env.NEXT_PUBLIC_TABLELAND_PRIVATE_KEY;
console.log("api private key: ", privateKey);
let db;
const app = (0, express_1.default)();
const port = 3002;
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
let personalInfos = "personalinfos3_80001_7931";
let scoreboard = "game1_80001_7928";
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("setting up db");
    db = yield (0, db_1.setUpDB)();
});
setup();
/*
API SCHEMA
personalInfos:
    id primary key,TEXT,unique
    balance int
    gamerights int
game1:
    id primary key,TEXT,unique
    score int
*/
app.get('/api/getPersonalInfos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let statement = `SELECT * FROM ${personalInfos}`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = yield (0, db_1.query)(db, statement);
        console.log('After query:', results); // Log the results after the query
        res.json(results);
    }
    catch (e) {
        console.log("Error getting personal informations: " + e);
        res.status(500).json({ error: 'Error getting personal informations' });
    }
}));
app.get('/api/getPersonalInfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        let statement = `SELECT * FROM ${personalInfos} WHERE id = "${id}"`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = yield (0, db_1.query)(db, statement);
        res.json(results);
    }
    catch (e) {
        console.log("Error getting personal information: " + e);
        res.status(500).json({ error: 'Error getting personal information' });
    }
}));
app.get('/api/getScores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let statement = `SELECT * FROM ${scoreboard} `;
        console.log('Before query:', db); // Log the value of db before the query
        const results = yield (0, db_1.query)(db, statement);
        res.json(results);
    }
    catch (e) {
        console.log("Error getting scoreboard: " + e);
        res.status(500).json({ error: 'Error getting scoreboard' });
    }
}));
app.get('/api/getScore', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        let statement = `SELECT * FROM ${scoreboard} WHERE id = "${id}"`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = yield (0, db_1.query)(db, statement);
        res.json(results);
    }
    catch (e) {
        console.log("Error checking score: " + e);
        res.status(500).json({ error: 'Error checking score' });
    }
}));
// these are very insecure, we are aware of that
app.get('/api/setScore', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const score = req.query.score;
    try {
        let statement = `INSERT INTO ${scoreboard} (id, score) VALUES ("${id}", ${score})`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = yield (0, db_1.insert)(db, statement, []); // pass null if there are no parameters
        res.json(results);
    }
    catch (e) {
        console.log("Error setting score: " + e);
        res.status(500).json({ error: 'Error setting score' });
    }
}));
app.get('/api/updateScore', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const score = req.query.score;
    try {
        let statement = `UPDATE ${scoreboard} SET score = ${score} WHERE id = "${id}"`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = yield (0, db_1.update)(db, statement, []); // pass null if there are no parameters
        res.json(results);
    }
    catch (e) {
        console.log("Error updating score: " + e);
        res.status(500).json({ error: 'Error updating score' });
    }
}));
app.get('/api/setBalance', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const balance = req.query.balance;
    try {
        let statement = `INSERT INTO ${personalInfos} (id, balance) VALUES ("${id}", ${balance})`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = yield (0, db_1.update)(db, statement, []); // pass null if there are no parameters
        res.json(results);
    }
    catch (e) {
        console.log("Error setting balance: " + e);
        res.status(500).json({ error: 'Error setting balance' });
    }
}));
app.get('/api/setGameRights', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const gameRights = req.query.gameRights;
    try {
        let statement = `UPDATE ${personalInfos} SET gameRights = ${gameRights} WHERE id = "${id}"`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = yield (0, db_1.update)(db, statement, []); // pass null if there are no parameters
        res.json(results);
    }
    catch (e) {
        console.log("Error setting game rights: " + e);
        res.status(500).json({ error: 'Error setting game rights' });
    }
}));
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
