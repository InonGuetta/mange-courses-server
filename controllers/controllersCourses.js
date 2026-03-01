import { createOneCourseService, updateOneCourseService, getAllCoursesService, deleteOneCourseService, searchCoursesService } from '../services/servicesCourses.js';

export const createOneCourse = async (req, res) => {
    try {
        const newCourse = await createOneCourseService(req.body);
        if (!newCourse) {
            return res.status(400).send({ message: "The input does not meet the required conditions / does not exist" });
        }
        res.status(200).send({ course: newCourse });
    } catch (e) {
        res.status(500).send({ message: "the added not working", error: e.message });
    }
};
 
export const getAllCourses = async (req, res) => {
    try {
        const courses = await getAllCoursesService();
        if (!courses) {
            return res.status(404).send({ message: "the courses not found" });
        }
        res.status(200).send({ courses });
    } catch (e) {
        res.status(500).send({ message: "Error get all courses", error: e.message });
    }
};

export const deleteOneCourse = async (req, res) => {
    try {
        const deletedCourse = await deleteOneCourseService(req.params.id);
        if (!deletedCourse) {
            return res.status(404).send({ message: 'course not found' });
        }
        res.status(200).send({ message: 'course deleted', deletedCourse });
    } catch (e) {
        res.status(500).send({ message: 'delete failed', err: e.message });
    }
};

export const updateOneCourse = async (req, res) => {
    try {
        const updatedCourse = await updateOneCourseService(req.params.id, req.body);
        if (!updatedCourse) {
            return res.status(404).send({ message: 'course not found' });
        }
        res.status(200).send({ message: 'course updated', updatedCourse });
    } catch (e) {
        res.status(500).send({ message: 'update failed', err: e.message });
    }
};

export const searchCourses = async (req, res) => {
    try {
        const { name_course } = req.query;
        if (!name_course) {
            return res.status(400).send({ message: 'Missing search parameter: name_course' });
        }
        const courses = await searchCoursesService(name_course);
        res.status(200).send({ courses });
    } catch (e) {
        res.status(500).send({ message: 'search failed', err: e.message });
    }
};
