import { pool } from "../db/pool.js";


export const getAllFavoriteService = async() =>{
    try{
        const result = await pool.query(`SELECT * FROM favorite`);
        return result.rows;
    }catch(e){
        console.error("Error get all favorites", e.message);
        throw e;
    }
}

export const addFavoriteOneService = async (userId, courseId) => {
    try {
        const result = await pool.query(
            `
            INSERT INTO favorite (user_id, course_id)
            VALUES ($1,$2)
            ON CONFLICT (user_id, course_id) DO NOTHING
            RETURNING *
            `,
            [userId, courseId]
        );
        return result.rows[0] ?? null;

    } catch (e) {
        console.error("Error add favorite", e.message);
        throw e;
    }
} 

export const removeFavoriteOneService = async (id) => {
    try {
        const result = await pool.query(
            `
            DELETE FROM favorite
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );
        if (result.rowCount === 0) return null;
        return result.rows[0];
    } catch (e) {
        console.error("Error remove favorite", e.message);
        throw e;
    }
}

export const getAllFavoritesByUserService = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT 
            f.id           AS favorite_id,
            f.user_id,
            f.course_id,
            c.name_course,
            c.detail,
            c.teacher_id,
            t.name         AS teacher_name,
            t.email        AS teacher_email
            FROM favorite f 
            JOIN courses c ON c.id = f.course_id
            JOIN users t ON t.id = c.teacher_id
            WHERE f.user_id = $1
            ORDER BY f.id DESC
            `,
            [userId]);
        return result.rows;
    } catch (e) {
        console.error("Error get all favorire", e.message);
        throw e;
    }
} 