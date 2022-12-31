const db = require("./../db");
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const History = sequelize.define('History', {
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    local_time:{
        type:Sequelize.DataTypes.DATE,
        allowNull:false
    }
});
module.exports= History;