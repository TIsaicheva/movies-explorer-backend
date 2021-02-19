const mongoose = require('mongoose');
const { NOT_CORRECT_FORMAT_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g;
        return regExp.test(v);
      },
      message: (props) => `${props.value}: ${NOT_CORRECT_FORMAT_MESSAGE}`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g;
        return regExp.test(v);
      },
      message: (props) => `${props.value}: ${NOT_CORRECT_FORMAT_MESSAGE}`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g;
        return regExp.test(v);
      },
      message: (props) => `${props.value}: ${NOT_CORRECT_FORMAT_MESSAGE}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
