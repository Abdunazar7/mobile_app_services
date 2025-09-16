const router = require("express").Router();
const {
  addMobileAppService,
  getMobileAppServices,
  getOneMobileAppService,
  updateMobileAppService,
  deleteMobileAppService,
} = require("../controllers/service.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const ownerGuard = require("../middlewares/guards/owner.guard");
const roleGuard = require("../middlewares/guards/role.guard");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createServiceSchema, updateServiceSchema } = require("../validators/service.validator");

router.post("/", authGuard, roleGuard("provider"), validateJoi(createServiceSchema), addMobileAppService);
router.get("/", getMobileAppServices);
router.get("/:id", getOneMobileAppService);
router.put("/:id", authGuard, roleGuard("provider"), ownerGuard, validateJoi(updateServiceSchema), updateMobileAppService);
router.delete("/:id", authGuard, roleGuard("provider"), ownerGuard, deleteMobileAppService);

module.exports = router;