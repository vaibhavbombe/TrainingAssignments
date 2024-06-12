import sequelize from '../config/database';
import Book from './Book';
import Author from './Author';
import User from './User';
import Review from './Review';
import Rating from './Rating';
import Payment from './Payment';


Book.belongsToMany(Author, { through: 'BookAuthors' });
Author.belongsToMany(Book, { through: 'BookAuthors' });

Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Rating, { foreignKey: 'bookId' });
Rating.belongsTo(Book, { foreignKey: 'bookId' });

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Payment, { foreignKey: 'bookId' });
Payment.belongsTo(Book, { foreignKey: 'bookId' });

export {
  sequelize,
  Book,
  Author,
  User,
  Review,
  Rating,
  Payment
};
