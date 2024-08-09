const { Model, DataTypes } = require('sequelize');

class Order extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users', // Reference to the Users table
                    key: 'id'
                }
            },
            menuItemId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'MenuItems', // Reference to the MenuItems table
                    key: 'id'
                }
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            totalAmount: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'pending'
            }
        }, {
            sequelize,
            modelName: 'Order'
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        this.belongsTo(models.MenuItem, { foreignKey: 'menuItemId', as: 'menuItem' });
    }
}

module.exports = Order;
