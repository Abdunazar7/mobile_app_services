const router = require("express").Router();
const {
  getServicesByDateRange,
  getClientsByDateRange,
  getClientsWhoCancelledByDateRange,
  getTopOwnersByService,
  getPaymentHistoryByClient,
} = require("../controllers/reports.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const roleGuard = require("../middlewares/guards/role.guard");

router.use(authGuard, roleGuard("admin"));

router.get("/services-by-date", getServicesByDateRange);
router.get("/clients-by-date", getClientsByDateRange);
router.get("/cancelled-clients-by-date", getClientsWhoCancelledByDateRange);
router.get("/top-owners", getTopOwnersByService);
router.get("/payments/client/:clientId", getPaymentHistoryByClient);

module.exports = router;