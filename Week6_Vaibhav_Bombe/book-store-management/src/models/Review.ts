import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Review extends Model {
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public content!: string;
}

Review.init({
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Review',
});

export default Review;
