import express from "express";
import { createUser, updateUser, getAllUsers, deleteUser, searchUsers } from '../controllers/controllersUsers.js'
const routerUsers = express.Router();

routerUsers.post("/create-user", createUser);
routerUsers.get("/get-all-user", getAllUsers);
routerUsers.put("/update-user/:id", updateUser);
routerUsers.delete("/delete-user/:id", deleteUser);

// חיפוש חכם לפי שם (חלקי, לא תלוי רישיות)
// יש צורך לבדוק יותר לעומק 
routerUsers.get("/search-user", searchUsers);


export default routerUsers;