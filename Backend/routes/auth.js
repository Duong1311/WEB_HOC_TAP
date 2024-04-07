const express = require("express");
const authControllers = require("../controllers/authControllers");
const middleware = require("../Middleware");
const router = express.Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.post("/refresh", authControllers.refreshToken);
router.post("/logout", middleware.verifyToken, authControllers.logout);

module.exports = router;
