const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const {
  validateMovieBody,
  validateMovieIdParam,
} = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', validateMovieBody, createMovie);
router.delete('/:movieId', validateMovieIdParam, deleteMovie);

module.exports = router;
