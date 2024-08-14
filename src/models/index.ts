import User from './User';
import MenuItem from './MenuItem';
import Order from './Order';
import Category from './Category';

const db = {
    User,
    MenuItem,
    Order,
    Category
};

// No need for explicit associations like in Sequelize.
// Relationships should be managed at the query level or within specific methods.

export default db;
