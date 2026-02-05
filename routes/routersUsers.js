import express from "express";
import { createOneUser, updateOneUser, getAllUsers, deleteOneUser, searchUsers } from '../controllers/controllersUsers.js'
const routerUsers = express.Router();

routerUsers.post("/create-user", createOneUser);
routerUsers.get("/get-all-users", getAllUsers);
routerUsers.put("/update-user/:id", updateOneUser);
routerUsers.delete("/delete-user/:id", deleteOneUser);
 
routerUsers.get("/search-user", searchUsers);
 

export default routerUsers;