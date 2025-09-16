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
const selfGuard = require("../middlewares/guards/self.guard");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createProviderSchema, updateProviderSchema } = require("../validators/provider.validator");

router.post("/", validateJoi(createProviderSchema), addProvider);
router.get("/", authGuard, getProviders);
router.get("/:id", authGuard, getOneProvider);
router.put("/:id", authGuard, roleGuard("provider"), selfGuard, validateJoi(updateProviderSchema), updateProvider);
router.delete("/:id", authGuard, roleGuard("admin"), deleteProvider);

module.exports = router;
