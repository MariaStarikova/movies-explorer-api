const router = require("express").Router();
const {
  getMovies,
  postMovie,
  deleteMovie
} = require("../controllers/movies");
const {
  validationMovie,
  validationMoviedId,
} = require("../middlewares/validationMovie");

router.get("/", getMovies);
router.post("/", validationMovie, postMovie);
router.delete("/:movieId", validationMoviedId, deleteMovie);

module.exports = router;