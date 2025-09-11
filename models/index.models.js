const Admin = require("./admin.model");
const Provider = require("./provider.model");
const Client = require("./client.model");
const Status = require("./status.model");
const MobileAppService = require("./service.model");
const Contract = require("./contract.model");
const Payment = require("./payment.model");

// ======================== Associations ========================

// Provider <-> MobileAppService (one-to-many)
// Bir Provayder ko'plab xizmatlar taklif qilishi mumkin.
Provider.hasMany(MobileAppService, { foreignKey: "owner_id" });
MobileAppService.belongsTo(Provider, { foreignKey: "owner_id" });

// Contract bog'lanishlari
// Har bir shartnoma bitta Mijoz, Provayder, Xizmat va Statusga tegishli.
Client.hasMany(Contract, { foreignKey: "client_id" });
Contract.belongsTo(Client, { foreignKey: "client_id" });

Provider.hasMany(Contract, { foreignKey: "owner_id" });
Contract.belongsTo(Provider, { foreignKey: "owner_id" });

MobileAppService.hasMany(Contract, { foreignKey: "service_id" });
Contract.belongsTo(MobileAppService, { foreignKey: "service_id" });

Status.hasMany(Contract, { foreignKey: "status_id" });
Contract.belongsTo(Status, { as: 'status', foreignKey: "status_id" });

// Contract <-> Payment (one-to-many)
// Bitta shartnoma bo'yicha ko'plab to'lovlar bo'lishi mumkin.
Contract.hasMany(Payment, { foreignKey: "contract_id" });
Payment.belongsTo(Contract, { foreignKey: "contract_id" });


module.exports = {
  Admin,
  Provider,
  Client,
  Status,
  MobileAppService,
  Contract,
  Payment,
};