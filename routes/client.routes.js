const router = require("express").Router();
const {
  addClient,
  getClients,
  getOneClient,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

const { validateJoi } = require("../middlewares/validators/joi.validator");
const {
  createClientSchema,
  updateClientSchema,
} = require("../validators/client.validator");

router.post("/", validateJoi(createClientSchema), addClient);
router.get("/", getClients);
router.get("/:id", getOneClient);
router.put("/:id", validateJoi(updateClientSchema), updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
