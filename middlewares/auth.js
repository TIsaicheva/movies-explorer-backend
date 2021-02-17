const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // получить из объекта запроса заголовок авторизации
  const { authorization } = req.headers;

  // обработать кейс, когда заголовка нет
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  // извлечь jwt
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  // записать payload в объект запроса
  req.user = payload;

  // пропустить запрос дальше
  next();
};
