const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Status = sequelize.define(
  "statuses",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Status;