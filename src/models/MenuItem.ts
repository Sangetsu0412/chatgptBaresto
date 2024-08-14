import pool from '../config/db';

export interface MenuItemAttributes {
    id?: number;
    name: string;
    price: number;
    description?: string;
    categoryId: number;
}

export class MenuItem {
    // Create a new MenuItem
    static async create(data: MenuItemAttributes): Promise<MenuItemAttributes> {
        const { name, price, description, categoryId } = data;
        const query = `
            INSERT INTO "MenuItems" ("name", "price", "description", "categoryId", "createdAt", "updatedAt")
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            RETURNING *;
        `;
        const values = [name, price, description, categoryId];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Find a MenuItem by ID
    static async findById(id: number): Promise<MenuItemAttributes | null> {
        const query = `SELECT * FROM "MenuItems" WHERE id = $1;`;
        const values = [id];

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // Update a MenuItem
    static async update(id: number, data: Partial<MenuItemAttributes>): Promise<MenuItemAttributes | null> {
        const { name, price, description, categoryId } = data;
        const query = `
            UPDATE "MenuItems"
            SET "name" = COALESCE($1, "name"),
                "price" = COALESCE($2, "price"),
                "description" = COALESCE($3, "description"),
                "categoryId" = COALESCE($4, "categoryId"),
                "updatedAt" = NOW()
            WHERE "id" = $5
            RETURNING *;
        `;
        const values = [name, price, description, categoryId, id];
        
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // Delete a MenuItem
    static async delete(id: number): Promise<void> {
        const query = `DELETE FROM "MenuItems" WHERE id = $1;`;
        const values = [id];

        await pool.query(query, values);
    }

    // Example of finding with relationships (Join with Category)
    static async findByIdWithCategory(id: number): Promise<any> {
        const query = `
            SELECT m.*, c."name" as "categoryName"
            FROM "MenuItems" m
            JOIN "Categories" c ON m."categoryId" = c.id
            WHERE m.id = $1;
        `;
        const values = [id];

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }
}
