const router = require("express").Router();

const authRouter = require("./auth.routes");
const adminRouter = require("./admin.routes");
const providerRouter = require("./provider.routes");
const clientRouter = require("./client.routes");
const statusRouter = require("./status.routes");
const mobileAppServiceRouter = require("./service.routes");
const contractRouter = require("./contract.routes");
const paymentRouter = require("./payment.routes");

// Har bir router uchun prefiks (URL'ning boshlang'ich qismi)
router.use("/auth", authRouter);
router.use("/admins", adminRouter);
router.use("/providers", providerRouter);
router.use("/clients", clientRouter);
router.use("/statuses", statusRouter);
router.use("/services", mobileAppServiceRouter);
router.use("/contracts", contractRouter);
router.use("/payments", paymentRouter);

module.exports = router;