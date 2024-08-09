import { Model, DataTypes, Sequelize } from 'sequelize';

interface CategoryAttributes {
    id?: number;
    name: string;
    description?: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    public id!: number;
    public name!: string;
    public description?: string;

    static initModel(sequelize: Sequelize): typeof Category {
        return Category.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
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
            modelName: 'Category',
            tableName: 'Categories'
        });
    }

    static associate(models: any) {
        this.hasMany(models.MenuItem, { foreignKey: 'categoryId', as: 'menuItems' });
    }
}

export default Category;
