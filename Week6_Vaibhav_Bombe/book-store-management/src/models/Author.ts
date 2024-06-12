import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Author extends Model {
  public id!: string;
  public name!: string;
  public bio!: string;
  public birthdate!: Date;
  public isSystemUser!: boolean;
}

Author.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isSystemUser: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Author',
});

export default Author;
