import express from "express";
import { createUser } from '../controller/controllersUsers.js'
const routerUsers = express.Router();

routerUsers.post("/create-users", createUser);

export default routerUsers;