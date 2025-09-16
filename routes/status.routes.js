const router = require("express").Router();
const {
  addStatus,
  getStatuses,
  getOneStatus,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const iscreatorGuard = require("../middlewares/guards/iscreator.guard");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createStatusSchema, updateStatusSchema } = require("../validators/status.validator");

router.post("/", authGuard, iscreatorGuard,validateJoi(createStatusSchema), addStatus);
router.get("/", getStatuses);
router.get("/:id", getOneStatus);
router.put("/:id", authGuard, iscreatorGuard, validateJoi(updateStatusSchema), updateStatus);
router.delete("/:id", authGuard, iscreatorGuard, deleteStatus);

module.exports = router;