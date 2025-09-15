const router = require("express").Router();
const {
  addProvider,
  getProviders,
  getOneProvider,
  updateProvider,
  deleteProvider,
} = require("../controllers/provider.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const roleGuard = require("../middlewares/guards/role.guard");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createProviderSchema, updateProviderSchema } = require("../validators/provider.validator");

router.post("/", validateJoi(createProviderSchema), addProvider);
router.get("/", getProviders);
router.get("/:id", getOneProvider);
router.put("/:id", authGuard, roleGuard("admin", "owner"), validateJoi(updateProviderSchema), updateProvider);
router.delete("/:id", authGuard, roleGuard("admin", "owner"), deleteProvider);

module.exports = router;
