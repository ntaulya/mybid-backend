const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
});

class Asset extends Model { }
Asset.init({
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'email',
    },
  },
  name: { allowNull: false, type: DataTypes.STRING },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  image: { allowNull: false, type: DataTypes.STRING },
  basePrice: { allowNull: false, type: DataTypes.INTEGER },
  isSold: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: false },
  endedAt: { allowNull: false, type: DataTypes.DATE },
}, {
  sequelize,
  tableName: 'assets',
});

module.exports = Asset;