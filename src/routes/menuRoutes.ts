import express, { Request, Response } from 'express';
import pool from '../config/db'; // Assuming you have set up a PostgreSQL pool

const router = express.Router();

// GET all menu items
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM menu_items');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching menu items.' });
    }
});

// GET a single menu item by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM menu_items WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the menu item.' });
    }
});

// POST a new menu item
router.post('/', async (req: Request, res: Response) => {
    const { name, price, description, categoryId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO menu_items (name, price, description, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, description, categoryId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the menu item.' });
    }
});

// PUT to update an existing menu item by ID
router.put('/:id', async (req: Request, res: Response) => {
    const { name, price, description, categoryId } = req.body;
    try {
        const result = await pool.query(
            'UPDATE menu_items SET name = $1, price = $2, description = $3, category_id = $4 WHERE id = $5 RETURNING *',
            [name, price, description, categoryId, req.params.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the menu item.' });
    }
});

// DELETE a menu item by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('DELETE FROM menu_items WHERE id = $1', [req.params.id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the menu item.' });
    }
});

export default router;
