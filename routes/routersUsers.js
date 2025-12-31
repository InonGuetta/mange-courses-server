import express from "express";
import { createOneUser, updateOneUser, getAllUsers, deleteOneUser, searchUsers } from '../controllers/controllersUsers.js'
const routerUsers = express.Router();

routerUsers.post("/create-user", createOneUser);
routerUsers.get("/get-all-user", getAllUsers);
routerUsers.put("/update-user/:id", updateOneUser);
routerUsers.delete("/delete-user/:id", deleteOneUser);

// חיפוש חכם לפי שם (חלקי, לא תלוי רישיות)
// יש צורך לבדוק יותר לעומק 
routerUsers.get("/search-user", searchUsers);
 

export default routerUsers;