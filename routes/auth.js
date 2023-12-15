const userModel = require("../models/user.Model");
const router = require("express").Router();
const crypto = require('crypto');
const userCtrl = require("../controllers/user.controller");

//Register user
router.post("/register", userCtrl.register);

//Login User
router.post("/login", userCtrl.login);

module.exports = router;