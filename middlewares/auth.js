const jwt = require('jsonwebtoken');
const { AUTHORIZATION_REQUIRED_ERR } = require('../utils/constants');
const {
  JWT_SECRET: secret,
  NODE_ENV,
  JWT_SECRET,
} = require('../config.js');
const NoAuthorizationError = require('../errors/no-auth-err');

module.exports = (req, res, next) => {
  // получить из объекта запроса заголовок авторизации
  const { authorization } = req.headers;

  // обработать кейс, когда заголовка нет
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NoAuthorizationError(AUTHORIZATION_REQUIRED_ERR));
  }

  // извлечь jwt
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secret);
  } catch (e) {
    next(new NoAuthorizationError(AUTHORIZATION_REQUIRED_ERR));
  }

  // записать payload в объект запроса
  req.user = payload;

  // пропустить запрос дальше
  next();
};
