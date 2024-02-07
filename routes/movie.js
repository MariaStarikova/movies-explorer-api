const router = require("express").Router();
const {
  getMovies,
  postMovie,
  deleteMovie
} = require("../controllers/movies");
// const {
//   validationUpdateUser,
//   validationUpdateAvatar,
//   validationUserId,
// } = require("../middlewares/validationUser");

router.get("/", getMovies);
router.post("/", postMovie);
router.delete("/:movieId", deleteMovie);

module.exports = router;