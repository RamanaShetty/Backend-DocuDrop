const { Router } = require("express");

const clientServices = require("../services/clientService");

const router = Router({ strict: true });

router.post("/login", clientServices.login);
router.post("/register", clientServices.register);

module.exports = router;
