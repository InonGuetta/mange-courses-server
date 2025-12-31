import "dotenv/config";
import express from "express";
import { pool } from "./db/pool.js";
import routersUsers from "./routes/routersUsers.js";
import routerFavorite from "./routes/routersFavorite.js";
import routerCourses from "./routes/routersCourses.js";
import routerStudentCourses from "./routes/routersStudentCourses.js";


const server = express();
server.use(express.json());
server.use("/api/users", routersUsers);
server.use("/api/favorite", routerFavorite);
server.use("/api/courses", routerCourses);
server.use("/api/student-courses", routerStudentCourses);

server.get("/health", async (req, res) => {
  try {
    await pool.query("select 1");
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

const httpServer = server.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. shutting down...`);
  httpServer.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
