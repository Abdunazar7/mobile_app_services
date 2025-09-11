const router = require("express").Router();
const { validate } = require("../config/db");
const {
  addContract,
  getContracts,
  getOneContract,
  updateContract,
  deleteContract,
} = require("../controllers/contract.controller");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createContractSchema, updateContractSchema } = require("../validators/contract.validator");

router.post("/", validateJoi(createContractSchema), addContract);
router.get("/", getContracts);
router.get("/:id", getOneContract);
router.put("/:id", validateJoi(updateContractSchema), updateContract);
router.delete("/:id", deleteContract);

module.exports = router;