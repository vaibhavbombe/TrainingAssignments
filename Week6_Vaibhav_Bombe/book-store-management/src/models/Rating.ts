import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Rating extends Model {
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public rating!: number;
}

Rating.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
}, {
  sequelize,
  modelName: 'Rating',
});

export default Rating;
