const router = require("express").Router();
const {
  addClient,
  getClients,
  getOneClient,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const selfGuard = require("../middlewares/guards/self.guard");

const { validateJoi } = require("../middlewares/validators/joi.validator");
const {
  createClientSchema,
  updateClientSchema,
} = require("../validators/client.validator");

router.post("/", validateJoi(createClientSchema), addClient);
router.get("/", getClients);
router.get("/:id", getOneClient);
router.put("/:id", authGuard, selfGuard, validateJoi(updateClientSchema), updateClient);
router.delete("/:id", authGuard, selfGuard, deleteClient);

module.exports = router;
