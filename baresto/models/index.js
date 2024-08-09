const sequelize = require('../config/db'); // Import the Sequelize instance
const Sequelize = require('sequelize'); // Import Sequelize

// Import models
const User = require('./User');
const MenuItem = require('./MenuItem');
const Order = require('./Order');
const Category = require('./Category');

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

module.exports = db;
