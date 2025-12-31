import express from "express";
import { addStudentToCourse, removeStudentFromCourse, getCoursesByStudent, getStudentsByCourse } from '../controllers/controllersStudentCourses.js';
const routerStudentCourses = express.Router();

routerStudentCourses.post("/add-student-to-course/:course_id", addStudentToCourse);
routerStudentCourses.delete("/remove-student-from-course/:course_id", removeStudentFromCourse);
routerStudentCourses.get("/get-courses-by-student", getCoursesByStudent);
routerStudentCourses.get("/get-students-by-course", getStudentsByCourse);

export default routerStudentCourses;
