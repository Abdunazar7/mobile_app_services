const router = require("express").Router();
const {   adminLogin,
  adminLogout,
  clientLogin,
  clientLogout,
  providerLogin,
  providerLogout,
  refreshToken } = require(".././controllers/auth.controller");

router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);
router.post("/client/login", clientLogin);
router.post("/client/logout", clientLogout);
router.post("/provider/login", providerLogin);
router.post("/provider/logout", providerLogout);
router.post("/refresh", refreshToken);

module.exports = router;