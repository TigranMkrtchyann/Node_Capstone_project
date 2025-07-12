const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Exercise = sequelize.define("Exercise", {
    exerciseId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
    }
);

User.hasMany(Exercise, { foreignKey: "userId" });
Exercise.belongsTo(User, { foreignKey: "userId" });

module.exports = Exercise;
