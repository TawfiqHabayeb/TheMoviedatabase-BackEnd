const {
  addToWatchList,
  getWatchedList,
} = require("../controller/userController");
const { verifyToken } = require("../services/Auth");
const express = require("express");
const userController = require("../controller/userController");
const middlewares = require("../middlewares");
const router = express.Router();
const { isAuthenticated, signup } = require("../middlewares/index");
router.post("/signup", signup, userController.signup);

router.post("/login", userController.login);

router.get("/dash", isAuthenticated, userController.findByID);
router.post("/WatchedList", verifyToken, addToWatchList);
router.get("/GetWatchedMovies", getWatchedList);
module.exports = router;
