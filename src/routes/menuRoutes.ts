import express, { Request, Response } from 'express';
import { MenuItem } from '../models'; // Import your model

const router = express.Router();

// GET all menu items
router.get('/', async (req: Request, res: Response) => {
    try {
        const menuItems = await MenuItem.findAll();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching menu items.' });
    }
});

// GET a single menu item by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the menu item.' });
    }
});

// POST a new menu item
router.post('/', async (req: Request, res: Response) => {
    try {
        const newMenuItem = await MenuItem.create(req.body);
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the menu item.' });
    }
});

// PUT to update an existing menu item by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const [updated] = await MenuItem.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedMenuItem = await MenuItem.findByPk(req.params.id);
            res.status(200).json(updatedMenuItem);
        } else {
            res.status(404).json({ error: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the menu item.' });
    }
});

// DELETE a menu item by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await MenuItem.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the menu item.' });
    }
});

export default router;
