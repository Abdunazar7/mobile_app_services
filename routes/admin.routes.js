const router = require("express").Router();
const {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

const { validateJoi } = require("../middlewares/validators/joi.validator");
const {
  createAdminSchema,
  updateAdminSchema,
} = require("../validators/admin.validator");

router.post("/", validateJoi(createAdminSchema), addAdmin);
router.get("/", getAdmins);
router.get("/:id", getOneAdmin);
router.put("/:id", validateJoi(updateAdminSchema), updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
