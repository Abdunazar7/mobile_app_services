const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define(
  "admins",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING },
    is_creator: { type: DataTypes.BOOLEAN, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Admin;