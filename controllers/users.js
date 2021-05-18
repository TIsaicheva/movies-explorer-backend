const bcrypt = require('bcryptjs');
// импортировать модуль jsonwebtoken для создания токена
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ClientError = require('../errors/client-err');

const {
  JWT_SECRET: secret,
  NODE_ENV,
  JWT_SECRET,
} = require('../config.js');

const {
  USER_NOT_FOUND,
  VALIDATION_ERROR_MESSAGE,
} = require('../utils/constants');

function getUserInfo(req, res, next) {
  const id = req.user._id;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      return res.status(200).send({
        email: user.email,
        name: user.name,
        id: user._id,
      });
    })
    .catch(next);
}

function updateUserInfo(req, res, next) {
  const id = req.user._id;
  const { email, name } = req.body;

  return User.findByIdAndUpdate(
    id,
    { email, name },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      omitUndefined: true, // игнорирует свойсво значение которого undefined
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
      }
      return next(err);
    });
}

function createUser(req, res, next) {
  const { email, password, name } = req.body;

  // хэширование пароля методом hash() и запись в БД
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError') {
        return next(new ClientError(err.message));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : secret,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
}

module.exports = {
  getUserInfo, updateUserInfo, createUser, login,
};
