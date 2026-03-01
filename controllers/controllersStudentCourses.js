import { addStudentToCourseService, removeStudentFromCourseService, getCoursesByStudentService, getStudentsByCourseService, getAllCoursesService } from '../services/servicesStudentCourses.js';


export const getAllCourses = async (req, res) => {
    try {
        const result = await getAllCoursesService();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).send({message: "Error get all student courses"})
    }
}

export const addStudentToCourse = async (req, res) => {
    try {
        const student_id = req.user?.id || req.body.student_id || req.params.student_id;
        const course_id = req.body.course_id || req.params.course_id;
        if (!student_id || !course_id) {
            return res.status(400).json({ message: "student_id and course_id are required" });
        }
        const result = await addStudentToCourseService(student_id, course_id);
        if (!result) {
            return res.status(409).json({ message: "Already registered or failed to add" });
        }
        res.status(201).json(result);
    } catch (e) {
        res.status(500).send({ message: "Error add student to course" });
    }
};

export const removeStudentFromCourse = async (req, res) => {
    try {
        const student_id = req.user?.id || req.body.student_id || req.params.student_id;
        const course_id = req.body.course_id || req.params.course_id;
        if (!student_id || !course_id) {
            return res.status(400).json({ message: "student_id and course_id are required" });
        }
        const removed = await removeStudentFromCourseService(student_id, course_id);
        if (!removed) {
            return res.status(404).json({ message: "Registration not found" });
        }
        res.status(200).json({ message: "Registration removed successfully" });
    } catch (e) {
        res.status(500).send({ message: "Error remove student from course" });
    }
};

export const getCoursesByStudent = async (req, res) => {
    try {
        const student_id = req.params.student_id;
        if (!student_id) {
            return res.status(400).json({ message: "student_id is required" });
        }
        const courses = await getCoursesByStudentService(student_id);
        res.status(200).json(courses);
    } catch (e) {
        res.status(500).send({ message: "Error get courses by student" });
    }
};

export const getStudentsByCourse = async (req, res) => {
    try {
        const course_id = req.params.course_id;
        if (!course_id) {
            return res.status(400).json({ message: "course_id is required" });
        }
        const students = await getStudentsByCourseService(course_id);
        res.status(200).json(students);
    } catch (e) {
        res.status(500).send({ message: "Error get students by course" });
    }
};

