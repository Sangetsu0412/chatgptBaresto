import { Sequelize } from 'sequelize';
import sequelize from '../config/db'; // Importing sequelize instance

// Import models
import User from './User';
import {MenuItem} from './MenuItem';
import {Order} from './Order';
import Category from './Category';

// Initialize models and pass the Sequelize instance
const db = {
    User: User.init(sequelize, Sequelize),
    MenuItem: MenuItem.init(sequelize, Sequelize),
    Order: Order.init(sequelize, Sequelize),
    Category: Category.init(sequelize, Sequelize)
};

// Define associations
User.associate(db);
MenuItem.associate(db);
Order.associate(db);
Category.associate(db);

export default db; // Export the db object as default
