import express from 'express';
import { insert , query, update, setUpDB } from './db';
import { Database } from '@tableland/sdk';

export type Request = express.Request;
export type Response = express.Response;

let db: Database;
const app = express()
const port = 3002
app.use(express.static("public"));
app.use(express.json());

let personalInfos: string = "personalinfoss_80001_7978";
let scoreboard: string = "gamelast_80001_8061";

const setup = async () => {
    console.log("setting up db");
    db = await setUpDB();
}
setup();

app.get('/api/getPersonalInfos', async (req: Request, res: Response) => {
    try {
        let statement =  `SELECT * FROM ${personalInfos}`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = await query(db, statement);
        console.log('After query:', results); // Log the results after the query
        res.json(results);
    } catch (e) {
        console.log("Error getting personal informations: " + e);
        res.status(500).json({ error: 'Error getting personal informations' });
    }
});
app.get('/api/getPersonalInfo', async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        let statement =  `SELECT * FROM ${personalInfos} WHERE id = ${id}`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = await query(db, statement);
        res.json(results);
    } catch (e) {
        console.log("Error getting personal information: " + e);
        res.status(500).json({ error: 'Error getting personal information' });
    }
});
app.get('/api/getScores', async (req: Request, res: Response) => {
    try {
        let statement =  `SELECT * FROM ${scoreboard} LIMIT 5`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = await query(db, statement);
        res.json(results);
    } catch (e) {
        console.log("Error getting scoreboard: " + e);
        res.status(500).json({ error: 'Error getting scoreboard' });
    }
});
app.get('/api/getScore', async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        let statement =  `SELECT * FROM ${scoreboard} WHERE id = ${id}`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = await query(db, statement);
        res.json(results);
    } catch (e) {
        console.log("Error checking score: " + e);
        res.status(500).json({ error: 'Error checking score' });
    }
});
// these are very insecure, we are aware of that
app.get('/api/setPersonalInfo', async (req: Request, res: Response) => {
    const id = req.query.id;
    const balance = req.query.balance;
    const gamerights = req.query.gamerights;
    try {
        let statement =  `INSERT INTO ${personalInfos} (id, balance, gamerights) VALUES (?1,?2,?3)`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = await insert(db, statement, [id, balance, gamerights]); // pass null if there are no parameters
        res.json(results);
    }
    catch (e) {
        console.log("Error setting personal info: " + e);
        res.status(500).json({ error: 'Error setting personal info' });
    }
});
app.get('/api/setScore', async (req: Request, res: Response) => {
    const id = req.query.id;
    const score = req.query.score;
    try {
        let statement =  `INSERT INTO ${scoreboard} (id, score) VALUES (?1, ?2)`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = await insert(db, statement, [id, score]); // pass null if there are no parameters
        res.json(results);
    } catch (e) {
        console.log("Error setting score: " + e);
        res.status(500).json({ error: 'Error setting score' });
    }
    });
app.get('/api/updateScore', async (req: Request, res: Response) => {
    const id = req.query.id;
    const score = req.query.score;
    try {
        let statement =  `UPDATE ${scoreboard} SET score = ?1 WHERE id = ?2`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = await update(db, statement, [score, id]); // pass null if there are no parameters
        res.json(results);
    } catch (e) {
        console.log("Error updating score: " + e);
        res.status(500).json({ error: 'Error updating score' });
    }
});
app.get('/api/setBalance', async (req: Request, res: Response) => {
    const id = req.query.id;
    const balance = req.query.balance;
    try {
        let statement =  `UPDATE ${personalInfos} SET balance = ?1 WHERE id = ?2`;
        console.log('Before query:', db); // Log the value of db before the query
        const results = await update(db, statement, [balance, id]); // pass null if there are no parameters
        res.json(results);
    } catch (e) {
        console.log("Error setting balance: " + e);
        res.status(500).json({ error: 'Error setting balance' });
    }
});
app.get("/api/setGameRights", async (req: Request, res: Response) => {
    const id = req.query.id;
    const gamerights = req.query.gamerights;
    try {
      let statement = `UPDATE ${personalInfos} SET gamerights = ?1 WHERE id = ?2`;
      console.log("Before query:", db); // Log the value of db before the query
      const results = await update(db, statement, [gamerights, id]); // pass null if there are no parameters
      res.json(results);
    } catch (e) {
      console.log("Error setting game rights: " + e);
      res.status(500).json({ error: "Error setting game rights" });
    }
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
  });