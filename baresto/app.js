const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Import other routes as needed

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sync database models
sequelize.sync();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/menuitems', menuRoutes);
// Define other routes as needed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
