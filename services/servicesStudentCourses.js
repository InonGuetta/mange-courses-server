import { pool } from "../db/pool.js";


export const getAllCoursesService = async () => {
    try {
        const result = await pool.query(`SELECT * FROM student_courses`)
        return result.rows;
    }catch(e){
        console.error("Error get all student courses", e.message);
        throw e;
    }
}

export const addStudentToCourseService = async (student_id, course_id) => {
    try {
        const result = await pool.query(
            `INSERT INTO student_courses (student_id, course_id)
             VALUES ($1, $2)
             ON CONFLICT (student_id, course_id) DO NOTHING 
             RETURNING *`,
            [student_id, course_id]
        );
        return result.rows[0] ?? null;
    } catch (e) {
        console.error("Error add student to course", e.message);
        throw e;
    }
};

export const removeStudentFromCourseService = async (student_id, course_id) => {
    try {
        const result = await pool.query(
            `DELETE FROM student_courses WHERE student_id = $1 AND course_id = $2 RETURNING *`,
            [student_id, course_id]
        );
        if (result.rowCount === 0) return null;
        return result.rows[0];
    } catch (e) {
        console.error("Error remove student from course", e.message);
        throw e;
    }
};

export const getCoursesByStudentService = async (student_id) => {
    try {
        const result = await pool.query(
            `SELECT sc.id as student_course_id, sc.course_id, c.name_course, c.detail, c.teacher_id
             FROM student_courses sc
             JOIN courses c ON c.id = sc.course_id
             WHERE sc.student_id = $1
             ORDER BY sc.id DESC`,
            [student_id]
        );

        return result.rows;
    } catch (e) {
        console.error("Error get courses by student", e.message);
        throw e;
    }
};

export const getStudentsByCourseService = async (course_id) => {
    try {
        const result = await pool.query(
            `SELECT sc.id as student_course_id, sc.student_id, u.name, u.email
             FROM student_courses sc
             JOIN users u ON u.id = sc.student_id
             WHERE sc.course_id = $1
             ORDER BY sc.id DESC`,
            [course_id]
        );
        return result.rows;
    } catch (e) {
        console.error("Error get students by course", e.message);
        throw e;
    }
};