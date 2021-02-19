const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { RESOURCE_NOT_FOUND_ERR } = require('../utils/constants');

router.all('*', () => {
  throw new NotFoundError(RESOURCE_NOT_FOUND_ERR);
});

module.exports = router;
