const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Authcontroller")
const { validateSignup } = require("../middlewares/validation")

router.post("/login",AuthController.loginPOST)
router.post("/signup",AuthController.signupPOST)


module.exports = router;
