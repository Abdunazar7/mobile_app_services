const router = require("express").Router();
const {
  addStatus,
  getStatuses,
  getOneStatus,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");
const { validateJoi } = require("../middlewares/validators/joi.validator");
const { createStatusSchema, updateStatusSchema } = require("../validators/status.validator");

router.post("/", validateJoi(createStatusSchema), addStatus);
router.get("/", getStatuses);
router.get("/:id", getOneStatus);
router.put("/:id", validateJoi(updateStatusSchema), updateStatus);
router.delete("/:id", deleteStatus);

module.exports = router;