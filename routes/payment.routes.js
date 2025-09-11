const router = require("express").Router();
const {
  addPayment,
  getPayments,
  getOnePayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createPaymentSchema, updatePaymentSchema } = require("../validators/payment.validator");

router.post("/", validateJoi(createPaymentSchema), addPayment);
router.get("/", getPayments);
router.get("/:id", getOnePayment);
router.put("/:id", validateJoi(updatePaymentSchema), updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;