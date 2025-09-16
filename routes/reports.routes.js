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

router.get("/services-by-date", authGuard, roleGuard("admin"), getServicesByDateRange);
router.get("/clients-by-date", authGuard, roleGuard("admin"), getClientsByDateRange);
router.get("/cancelled-clients-by-date", authGuard, roleGuard("admin"), getClientsWhoCancelledByDateRange);
router.get("/top-owners", authGuard, roleGuard("admin"), getTopOwnersByService);
router.get("/payments/client/:clientId", authGuard, roleGuard("admin"), getPaymentHistoryByClient);

module.exports = router;