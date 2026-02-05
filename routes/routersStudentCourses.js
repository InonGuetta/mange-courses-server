import express from "express";
import { addStudentToCourse, removeStudentFromCourse, getCoursesByStudent, getStudentsByCourse, getAllCourses, searchStudentCourses } from '../controllers/controllersStudentCourses.js';
const routerStudentCourses = express.Router();


routerStudentCourses.get("/get-all-students-courses",getAllCourses)
routerStudentCourses.get("/get-courses-by-student/:student_id", getCoursesByStudent);
routerStudentCourses.get("/get-students-by-course/:course_id", getStudentsByCourse);
routerStudentCourses.post("/add-student-to-course/:course_id", addStudentToCourse);
routerStudentCourses.delete("/remove-student-from-course/:course_id", removeStudentFromCourse);
routerStudentCourses.get("/search-student-course", searchStudentCourses);

export default routerStudentCourses;
