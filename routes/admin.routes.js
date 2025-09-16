const router = require("express").Router();
const {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const iscreatorGuard = require("../middlewares/guards/iscreator.guard");
const selfGuard = require("../middlewares/guards/self.guard");

const { validateJoi } = require("../middlewares/validators/joi.validator");
const {
  createAdminSchema,
  updateAdminSchema,
} = require("../validators/admin.validator");

router.post("/", validateJoi(createAdminSchema), addAdmin);
router.get("/", getAdmins);
router.get("/:id", getOneAdmin);
router.put("/:id", authGuard, selfGuard, validateJoi(updateAdminSchema), updateAdmin);
router.delete("/:id", authGuard, iscreatorGuard, deleteAdmin);

module.exports = router;
