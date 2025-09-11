const router = require("express").Router();
const {
  addMobileAppService,
  getMobileAppServices,
  getOneMobileAppService,
  updateMobileAppService,
  deleteMobileAppService,
} = require("../controllers/service.controller");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createServiceSchema, updateServiceSchema } = require("../validators/service.validator");

router.post("/", validateJoi(createServiceSchema), addMobileAppService);
router.get("/", getMobileAppServices);
router.get("/:id", getOneMobileAppService);
router.put("/:id", validateJoi(updateServiceSchema), updateMobileAppService);
router.delete("/:id", deleteMobileAppService);

module.exports = router;