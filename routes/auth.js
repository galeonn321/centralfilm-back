const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");

//Register user
router.post("/register", userCtrl.register);

//Login User
router.post("/login", userCtrl.login);

module.exports = router;