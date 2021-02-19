const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { NOT_CORRECT_FORMAT_MESSAGE } = require('../utils/constants');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserUpdatingBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(NOT_CORRECT_FORMAT_MESSAGE);
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(NOT_CORRECT_FORMAT_MESSAGE);
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(NOT_CORRECT_FORMAT_MESSAGE);
    }),
    movieId: Joi.number().required(),
  }),
});

const validateMovieIdParam = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().required().length(24),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
  validateUserUpdatingBody,
  validateMovieBody,
  validateMovieIdParam,
};
