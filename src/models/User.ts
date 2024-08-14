import pool from '../config/db';
import { OrderAttributes } from './Order';

export interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    role?: string; // Keep role optional here
}

export class User {
    // Create a new User
    static async create(data: UserAttributes): Promise<UserAttributes> {
        const { username, email, password, role = 'user' } = data; // Default role to 'user'
        const query = `
            INSERT INTO "Users" ("username", "email", "password", "role", "createdAt", "updatedAt")
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            RETURNING *;
        `;
        const values = [username, email, password, role]; // Include role in values
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Find a User by ID
    static async findById(id: number): Promise<UserAttributes | null> {
        const query = `SELECT * FROM "Users" WHERE id = $1;`;
        const values = [id];

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // Find a User by username
    static async findByUsername(username: string): Promise<UserAttributes | null> {
        const query = `SELECT * FROM "Users" WHERE username = $1;`;
        const values = [username];

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // Update a User
    static async update(id: number, data: Partial<UserAttributes>): Promise<UserAttributes | null> {
        const { username, email, password } = data;
        const query = `
            UPDATE "Users"
            SET "username" = COALESCE($1, "username"),
                "email" = COALESCE($2, "email"),
                "password" = COALESCE($3, "password"),
                "updatedAt" = NOW()
            WHERE "id" = $4
            RETURNING *;
        `;
        const values = [username, email, password, id];
        
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // Delete a User
    static async delete(id: number): Promise<void> {
        const query = `DELETE FROM "Users" WHERE id = $1;`;
        const values = [id];

        await pool.query(query, values);
    }

    // Get all Orders for a User
    static async getOrders(userId: number): Promise<OrderAttributes[]> {
        const query = `SELECT * FROM "Orders" WHERE "userId" = $1;`;
        const values = [userId];

        const result = await pool.query(query, values);
        return result.rows;
    }
}
