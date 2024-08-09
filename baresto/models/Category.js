const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Category'
        });
    }

    static associate(models) {
        this.hasMany(models.MenuItem, { foreignKey: 'categoryId', as: 'menuItems' });
    }
}

module.exports = Category; 
