const mongoose = require('mongoose');
const { NOT_CORRECT_FORMAT_MESSAGE } = require('../utils/constants');

function currentYear() {
  const year = new Date().getFullYear();
  return year;
}

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    default: 'США',
  },
  director: {
    type: String,
    required: true,
    default: 'Режиссёр',
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    default: currentYear,
  },
  description: {
    type: String,
    required: true,
    default: 'Фильм',
  },
  image: {
    type: String,
    required: true,
    default: 'https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158',
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
    default: 'https://www.youtube.com',
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
    default: 'https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158',
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
