const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
},
    {
        timestamps: false,
    }
);

module.exports = User;
