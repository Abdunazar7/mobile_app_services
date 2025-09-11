const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MobileAppService = sequelize.define(
  "mobile_app_services",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    provider_id: { type: DataTypes.INTEGER, allowNull: false },
    app_type: { type: DataTypes.STRING(100), allowNull: false },
    platform: { type: DataTypes.STRING(50), allowNull: false },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    duration_days: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    features: { type: DataTypes.BIGINT, allowNull: false },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = MobileAppService;