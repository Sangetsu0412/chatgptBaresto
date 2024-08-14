import pool from '../config/db';

export interface OrderAttributes {
    id?: number;
    userId: number;
    menuItemId: number;
    quantity: number;
    totalAmount: number;
    status: string;
}

export class Order {
    // Create a new Order
    static async create(data: OrderAttributes): Promise<OrderAttributes> {
        const { userId, menuItemId, quantity, totalAmount, status } = data;
        const query = `
            INSERT INTO "Orders" ("userId", "menuItemId", "quantity", "totalAmount", "status", "createdAt", "updatedAt")
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
            RETURNING *;
        `;
        const values = [userId, menuItemId, quantity, totalAmount, status];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Find an Order by ID
    static async findById(id: number): Promise<OrderAttributes | null> {
        const query = `SELECT * FROM "Orders" WHERE id = $1;`;
        const values = [id];

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // Update an Order
    static async update(id: number, data: Partial<OrderAttributes>): Promise<OrderAttributes | null> {
        const { userId, menuItemId, quantity, totalAmount, status } = data;
        const query = `
            UPDATE "Orders"
            SET "userId" = COALESCE($1, "userId"),
                "menuItemId" = COALESCE($2, "menuItemId"),
                "quantity" = COALESCE($3, "quantity"),
                "totalAmount" = COALESCE($4, "totalAmount"),
                "status" = COALESCE($5, "status"),
                "updatedAt" = NOW()
            WHERE "id" = $6
            RETURNING *;
        `;
        const values = [userId, menuItemId, quantity, totalAmount, status, id];
        
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    // Delete an Order
    static async delete(id: number): Promise<void> {
        const query = `DELETE FROM "Orders" WHERE id = $1;`;
        const values = [id];

        await pool.query(query, values);
    }

    // Example of finding an order with relationships (Join with User and MenuItem)
    static async findByIdWithDetails(id: number): Promise<any> {
        const query = `
            SELECT o.*, u.username as "username", m.name as "menuItemName"
            FROM "Orders" o
            JOIN "Users" u ON o."userId" = u.id
            JOIN "MenuItems" m ON o."menuItemId" = m.id
            WHERE o.id = $1;
        `;
        const values = [id];

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }
}
