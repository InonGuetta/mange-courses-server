
import { pool } from "../db/pool.js";

export async function createOneUserService(data) {
    try {
        const { name, email, password_hash, role } = data;
        if (!name || !email || !password_hash || !role) {
            return null;
        }

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, password_hash, role]
        );
        return result.rows[0];
    } catch (e) {
        console.error("Error creating user", e.message);
        throw e;
    }
}

    
    // import userModel from "../db/pool.js";

    // export async function createOneUserService(data) {
    //     try{
    //         if(!data || Object.keys(data).length === 0){
    //             return null;
    //         }

    //         const insertDbOneUser = new userModel(data);
    //         return insertDbOneUser.save()
    //     }catch(e){
    //         console.error("Error fetching user", e.message);
    //         throw e;        
    //     }
    // }