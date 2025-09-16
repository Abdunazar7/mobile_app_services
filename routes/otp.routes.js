const { send, verify } = require("../controllers/otp.controller");

const router = require("express").Router();

router.post("/send", send);
router.post("/verify", verify);

module.exports = router;