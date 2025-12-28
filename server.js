import "dotenv/config";
import express from "express";
import { pool } from "./db/pool.js";
import routerUsers from './routes/routerUsers.js';

const server = express();
server.use(express.json());
server.use('/api', routerUsers);

server.get("/health", async (req, res) => {
    try {
        await pool.query("select 1");
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message })
    }
})

server.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})

const shutdown = (signal) => {
    console.log(`${signal} received. shutting down...`);
    server.close(async () => {
        await pool.end();
        process.exit(0);
    });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
