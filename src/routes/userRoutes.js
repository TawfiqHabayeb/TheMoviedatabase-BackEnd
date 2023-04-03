const express = require("express");
const userController = require("../controller/userController");
const middlewares = require("../middlewares");
const router = express.Router();
const { isAuthenticated, signup } = require("../middlewares/index");
router.post("/signup", signup, userController.signup);

router.post("/login", userController.login);

router.get("/dash", isAuthenticated, userController.findByID);
module.exports = router;
