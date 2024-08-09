const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'User'
        });
    }

    static associate(models) {
        this.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    }
}

module.exports = User;
