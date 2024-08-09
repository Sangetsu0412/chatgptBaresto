import { Model, DataTypes, Sequelize } from 'sequelize';
import { Optional } from 'sequelize';
import { Order } from './Order'; // Import related model

interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;

    static initModel(sequelize: Sequelize): typeof User {
        return User.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
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
            modelName: 'User',
            tableName: 'Users'
        });
    }

    static associate(models: any) {
        this.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    }
}

export default User;
