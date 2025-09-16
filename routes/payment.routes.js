const router = require("express").Router();
const {
  addPayment,
  getPayments,
  getOnePayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const roleGuard = require("../middlewares/guards/role.guard");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createPaymentSchema, updatePaymentSchema } = require("../validators/payment.validator");

router.post("/", authGuard, validateJoi(createPaymentSchema), addPayment);
router.get("/", authGuard, getPayments);
router.get("/:id", authGuard, getOnePayment);
router.put("/:id", authGuard, roleGuard("admin"), validateJoi(updatePaymentSchema), updatePayment);
router.delete("/:id", authGuard, roleGuard("admin"), deletePayment);

module.exports = router;