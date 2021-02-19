const router = require('express').Router();

const usersRouter = require('./users');
const movieRouter = require('./movies');
const resourceNotFoundRouter = require('./resource-not-found');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');
const {
  validateUserBody,
  validateAuthentication,
} = require('../middlewares/validations');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);
/* защитить маршруты usersRouter и movieRouter
   от неавторизованных пользователей, при помощи
   авторизационного мидлвэра auth */
router.use('/users', auth, usersRouter);
router.use('/movies', auth, movieRouter);

/* маршрут не защищён авторизацией,
   обрабатываются неверные пути, такие как:
   GET http://localhost:3000/signup,
   GET http://localhost:3000/signin,
   POST http://localhost:3000/unknown-path */
router.use('/', resourceNotFoundRouter);

module.exports = router;
