const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Provider = sequelize.define(
  "providers",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING(50) },
    address: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Provider;