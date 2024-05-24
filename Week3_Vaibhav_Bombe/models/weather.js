'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {
    
    static associate(models) {
      
    }
  }
  Weather.init({
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    weather: DataTypes.STRING,
    time: DataTypes.DATE,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Weather',
  });
  return Weather;
};