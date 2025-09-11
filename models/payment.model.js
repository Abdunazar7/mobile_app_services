const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
  "payments",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    paid_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    method: { type: DataTypes.STRING(50) },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Payment;