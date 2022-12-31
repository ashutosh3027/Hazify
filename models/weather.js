const db = require("./../db");
const {Sequelize, DataTypes }= require("sequelize");
const sequelize = db.sequelize;
const Weather = sequelize.define('Weather', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    weather_description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    weatherIcon:{
       type:DataTypes.TEXT,
       allowNull:false 
    },
});
module.exports= Weather;