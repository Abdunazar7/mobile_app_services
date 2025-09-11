const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Client = sequelize.define(
  "clients",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING(50) },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Client;