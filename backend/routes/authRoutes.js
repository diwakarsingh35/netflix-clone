const express = require("express");
const { register, login, forgotPasswordController    } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordController);

module.exports = router;
