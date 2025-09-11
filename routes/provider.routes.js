const router = require("express").Router();
const {
  addProvider,
  getProviders,
  getOneProvider,
  updateProvider,
  deleteProvider,
} = require("../controllers/provider.controller");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createProviderSchema, updateProviderSchema } = require("../validators/provider.validator");

router.post("/", validateJoi(createProviderSchema), addProvider);
router.get("/", getProviders);
router.get("/:id", getOneProvider);
router.put("/:id", validateJoi(updateProviderSchema), updateProvider);
router.delete("/:id", deleteProvider);

module.exports = router;