import pool from '../config/db';

interface CategoryAttributes {
    id?: number;
    name: string;
    description?: string;
}

class Category {
    public id?: number;
    public name!: string;
    public description?: string;

    constructor({ id, name, description }: CategoryAttributes) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // Create a new category
    static async create(category: CategoryAttributes): Promise<Category> {
        const { name, description } = category;
        const result = await pool.query(
            `INSERT INTO "Categories" (name, description) VALUES ($1, $2) RETURNING *`,
            [name, description]
        );
        return new Category(result.rows[0]);
    }

    // Find all categories
    static async findAll(): Promise<Category[]> {
        const result = await pool.query(`SELECT * FROM "Categories"`);
        return result.rows.map((row) => new Category(row));
    }

    // Find a category by ID
    static async findById(id: number): Promise<Category | null> {
        const result = await pool.query(`SELECT * FROM "Categories" WHERE id = $1`, [id]);
        if (result.rows.length > 0) {
            return new Category(result.rows[0]);
        }
        return null;
    }

    // Update a category
    static async update(id: number, updatedAttributes: Partial<CategoryAttributes>): Promise<Category | null> {
        const { name, description } = updatedAttributes;
        const result = await pool.query(
            `UPDATE "Categories" SET name = $1, description = $2 WHERE id = $3 RETURNING *`,
            [name, description, id]
        );
        if (result.rows.length > 0) {
            return new Category(result.rows[0]);
        }
        return null;
    }

    // Delete a category
    static async delete(id: number): Promise<void> {
        await pool.query(`DELETE FROM "Categories" WHERE id = $1`, [id]);
    }
}

export default Category;
