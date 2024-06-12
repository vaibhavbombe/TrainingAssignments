import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Book extends Model {
  public id!: string;
  public bookCode!: string;
  public title!: string;
  public description!: string;
  public publishedYear!: number;
  public price!: number;
  public authors!: string[];
  public externalId!: string;
}

Book.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bookCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  publishedYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  authors: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: false,
  },
  externalId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Book',
});

export default Book;
