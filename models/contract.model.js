const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contract = sequelize.define(
  "contracts",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    client_id: { type: DataTypes.INTEGER, allowNull: false },
    owner_id: { type: DataTypes.INTEGER, allowNull: false },
    service_id: { type: DataTypes.INTEGER, allowNull: false },
    status_id: { type: DataTypes.INTEGER, allowNull: false },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    total_price: { type: DataTypes.DECIMAL(12, 2) },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Contract;