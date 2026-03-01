import { pool } from "../db/pool.js";

export const createOneCourseService = async (data) => {
    try {
        const { name_course, detail, teacher_id } = data;
        if (!name_course || !detail || !teacher_id) return null;
        const result = await pool.query(
            `INSERT INTO courses (name_course, detail, teacher_id) VALUES ($1, $2, $3) RETURNING *`,
            [name_course, detail, teacher_id]
        );
        return result.rows[0];
    } catch (e) {
        console.error("Error creating course", e.message);
        throw e;
    }
};

export const getAllCoursesService = async () => {
    try {
        const result = await pool.query(`SELECT * FROM courses`);
        return result.rows;
    } catch (e) {
        console.error("Error get all courses", e.message);
        throw e;
    }
};

export const deleteOneCourseService = async (courseId) => {
    try {
        const result = await pool.query(
            `DELETE FROM courses WHERE id = $1 RETURNING *`,
            [courseId]
        );
        if (result.rowCount === 0) return null;
        return result.rows[0];
    } catch (e) {
        console.error("Error delete course", e.message);
        throw e;
    }
};

export const updateOneCourseService = async (courseId, data) => {
    try {
        const { name_course, detail, teacher_id } = data;
        const result = await pool.query(
            `UPDATE courses SET name_course = $1, detail = $2, teacher_id = $3 WHERE id = $4 RETURNING *`,
            [name_course, detail, teacher_id, courseId]
        );
        if (result.rowCount === 0) return null;
        return result.rows[0];
    } catch (e) {
        console.error("Error update course", e.message);
        throw e;
    }
};

export const searchCoursesService = async (name) => {
    try {
        const result = await pool.query(
            `SELECT * FROM courses WHERE LOWER(name_course) LIKE LOWER($1)` ,
            [`%${name}%`]
        );
        return result.rows;
    } catch (e) {
        console.error("Error search courses", e.message);
        throw e;
    }
};
