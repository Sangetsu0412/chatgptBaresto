import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db'; // Updated to use pg pool
import authRoutes from './routes/authRoutes';
import menuRoutes from './routes/menuRoutes';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Database connection check
pool.connect()
    .then(client => {
        console.log('Database connected...');
        client.release(); // Release the client back to the pool
    })
    .catch(err => {
        console.error('Error: ', err);
    });

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/menu-items', menuRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
