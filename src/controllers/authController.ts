import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { User } from '../models/User';

// Function to validate email format
const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Register a new user
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Check for required fields
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide username, email, and password' });
    }

    // Validate email format
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const client = await pool.connect();

        // Check if the email already exists
        const emailCheckQuery = 'SELECT * FROM "Users" WHERE email = $1';
        const emailCheckResult = await client.query(emailCheckQuery, [email]);

        if (emailCheckResult.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query('INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);

        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during registration' });
    }
};

// Login a user
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const client = await pool.connect();
        const query = 'SELECT id, username, password, role FROM "Users" WHERE username = $1';
        const values = [username];

        const result = await client.query(query, values);
        client.release();

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Placeholder for forgot password functionality
export const forgotPassword = async (req: Request, res: Response) => {
    // Implement forgot password logic
};
