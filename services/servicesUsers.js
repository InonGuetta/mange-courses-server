import { pool } from "../db/pool.js";


export const searchUsersService = async (name) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE LOWER(name) LIKE LOWER($1)`,
            [`%${name}%`]
        );
        return result.rows;
    } catch (e) {
        console.error("Error search users", e.message);
        throw e;
    }
}

export const deleteOneUserService = async (userId) => {
    try {
        const result = await pool.query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [userId]
        );
        if (result.rowCount === 0) return null;
        return result.rows[0];
    } catch (e) {
        console.error("Error delete user", e.message);
        throw e;
    }
}

export const getAllUsersService = async () => {
    try {
        const resultAllUsere = await pool.query(
            `SELECT * FROM users`
        )
        return resultAllUsere.rows;
    } catch (e) {
        console.error("Error get all users", e.message);
        throw e;
    }
}

export const createOneUserService = async (data) => {
    try {
        const { name, email, passwordHash, role } = data;
        if (!name || !email || !passwordHash || !role) return null;

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, passwordHash, role]
        );

        return result.rows[0];
    } catch (e) {
        console.error("Error creating user", e.message);
        throw e;
    }
};

export const updateOneUserService = async (userId, data) => {
    try {
        const whitelistEdit = ["name", "email", "password_hash", "role"];
        const oneUserInfoToUpdate = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [userId]
        )
        if (!oneUserInfoToUpdate || oneUserInfoToUpdate.rows.length === 0) {
            return null;
        }

        const setParts = [];
        const values = [];
        let i = 1;
        for (const item of whitelistEdit) {
            if (data[item] !== undefined) {
                setParts.push(`${item} = $${i}`);
                values.push(data[item]);
                i++;
            }
        }

        if (setParts.length === 0) return null;
        values.push(userId);

        const oneUserToUpdate = await pool.query(
            `UPDATE users
            SET ${setParts.join(", ")}
            WHERE id = $${values.length}
            RETURNING *
            `,
            values
        );

        if (oneUserToUpdate.rowCount === 0) return null;

        return oneUserToUpdate.rows[0];
    } catch (e) {
        console.error("Error update user", e.message);
        throw e;
    }
}