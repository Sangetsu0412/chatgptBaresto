import { Model, DataTypes } from 'sequelize';

export class MenuItem extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.DECIMAL(10, 2), // Corrected to DECIMAL for currency
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Categories', // Reference to the Categories table
                    key: 'id'
                }
            }
        }, {
            sequelize,
            modelName: 'MenuItem'
        });
    }

    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
        this.hasMany(models.Order, { foreignKey: 'menuItemId', as: 'orders' });
    }
}

module.exports = MenuItem;
