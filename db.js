const config = require("./config");
const mysql = require("mysql2");
const Sequelize = require("sequelize");
module.exports = db = {};
const initialize = async () => {
  const { host, port, user, password, database } = config.database;
  const pool = mysql.createPool({ host, port, user, password });
  pool.query(`CREATE DATABASE IF NOT EXISTS ${database};`, async (err, res) => {
    if (err) throw err;
    console.log(res);
    const sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: "mysql",
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
    });

    sequelize.authenticate().then((err) => {
      if (err) throw err;
      console.log("Authenticated!!");
    });
    db.sequelize = sequelize;
    // const location = require("./models/location.js");
    const Location = require("./models/location.js");
    const Weather = require("./models/weather.js");
    const History = require("./models/history.js");
    Location.hasMany(History); //will add locationId to history table
    History.belongsTo(Location);
    Weather.hasMany(History);
    History.belongsTo(Weather);
    await sequelize.sync();
    db.Location = Location;
    db.History = History;
    db.Weather = Weather;
  });
};
initialize();
// sequelize.sync({force:true});
