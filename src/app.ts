import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db';
import authRoutes from './routes/authRoutes';
import menuRoutes from './routes/menuRoutes';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

sequelize.sync();

app.use('/api/auth', authRoutes);
app.use('/api/menu-items', menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
