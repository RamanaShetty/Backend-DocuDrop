const { Router } = require("express");

const userServices = require("../services/userService");

const router = Router({ strict: true });

router.post("/login", userServices.login);
router.post("/register", userServices.register);

module.exports = router;
