const Movie = require("../models/movie");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({owner})
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN } = req.body;

  const newMovie = {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  };

  return Movie.create(newMovie)
    .then((movie) => {
      res.status(201).send({ movie });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Переданы некорректные данные при создании карточки."));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById({ _id: movieId })
    .orFail(() => {
      throw new NotFoundError("Передан несуществующий _id карточки.");
    })
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError("У вас нет прав на удаление этой карточки.");
      }
      return Movie.findByIdAndDelete(movie._id);
    })
    .then((movie) => {
      res.status(200).send({ message: "Успешно удалена карточка:", movie });
    })
    .catch(next);
};