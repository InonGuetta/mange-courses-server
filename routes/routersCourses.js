import express from "express";
import { createOneCourse, updateOneCourse, getAllCourses, deleteOneCourse, searchCourses } from '../controllers/controllersCourses.js';
const routerCourses = express.Router();

routerCourses.post("/create-course", createOneCourse);
routerCourses.get("/get-all-courses", getAllCourses);
routerCourses.put("/update-course/:id", updateOneCourse);
routerCourses.delete("/delete-course/:id", deleteOneCourse);
routerCourses.get("/search-course", searchCourses);

export default routerCourses;
