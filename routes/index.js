// const router = require("express").Router();
const express = require('express');
const router = express.Router();
const {
  createUser,
  login,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
// const { validationCreateUser, validationLogin } = require("../middlewares/validationUser");
const NotFoundError = require("../errors/not-found-err");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/users", auth, require("./user"));
router.use("/movies", auth, require("./movie"));

router.use((req, res, next) => {
  next(new NotFoundError("Запрашиваемый маршрут не найден"));
});

module.exports = router;