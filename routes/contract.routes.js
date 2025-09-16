const router = require("express").Router();
const { validate } = require("../config/db");
const {
  addContract,
  getContracts,
  getOneContract,
  updateContract,
  deleteContract,
} = require("../controllers/contract.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const roleGuard = require("../middlewares/guards/role.guard");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createContractSchema, updateContractSchema } = require("../validators/contract.validator");

router.post("/", authGuard, roleGuard("admin"), validateJoi(createContractSchema), addContract);
router.get("/", authGuard, getContracts);
router.get("/:id", authGuard, getOneContract);
router.put("/:id", authGuard, roleGuard("admin"), validateJoi(updateContractSchema), updateContract);
router.delete("/:id", authGuard, roleGuard("admin"), deleteContract);

module.exports = router;