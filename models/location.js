const db = require("../db");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = db.sequelize;
const Location = sequelize.define("Location", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lon: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
module.exports = Location;
