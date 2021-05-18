const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  VALIDATION_ERROR_MESSAGE,
  MOVIE_EXISTED_ERR,
  MOVIE_NOT_FOUND_ERR,
  NO_AUTHORITY_ERROR_MESSAGE,
  INVALID_MOVIE_ID_ERR,
} = require('../utils/constants');

function getMovies(req, res, next) {
  return Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  return Movie.find({})
    .then((movies) => {
      const isMovieSaved = movies.some(
        (movie) => (movie.movieId === movieId && (movie.owner).toString() === req.user._id),
      );
      if (!isMovieSaved) {
        return Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailer,
          nameRU,
          nameEN,
          thumbnail,
          movieId,
          owner: req.user._id,
        })
          .then((createdMovie) => res.status(200).send(createdMovie));
      }
      return Promise.reject(new BadRequestError(MOVIE_EXISTED_ERR));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
      }
      return next(err);
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(MOVIE_NOT_FOUND_ERR);
    })
    .then((movie) => {
      const movieOwner = (movie.owner).toString();
      if (movieOwner === req.user._id) {
        return Movie.deleteOne({ _id: movieId })
          .then((deleted) => res.status(200).send(deleted));
      }
      return Promise.reject(new ForbiddenError(NO_AUTHORITY_ERROR_MESSAGE));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_MOVIE_ID_ERR));
      }
      return next(err);
    });
}

module.exports = {
  getMovies, createMovie, deleteMovie,
};
