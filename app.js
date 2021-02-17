const express = require('express');

// создать приложение методом express()
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const { celebrate, Joi, errors } = require('celebrate');
const usersRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const notFoundRouter = require('./routes/pageNotFound');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { INTERNAL_SERVER_ERROR_MESSAGE } = require('./utils/constants');

const auth = require('./middlewares/auth');

// подключиться к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(requestLogger); // логгер запросов

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
/* защитить маршруты usersRouter и movieRouter
   от неавторизованных пользователей, при помощи
   авторизационного мидлвэра auth
*/

app.use('/users', auth, usersRouter);
app.use('/movies', auth, movieRouter);
app.use('/', notFoundRouter);

app.use(errorLogger); // логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// мидлвэр для централизованной обработки ошибок
app.use((err, req, res, next) => {
  // res.status(err.statusCode).send({ message: err.message });
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? INTERNAL_SERVER_ERROR_MESSAGE
        : message,
    });
  next();
});

app.listen(PORT, () => {
});
