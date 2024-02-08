const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
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
      type: Number,
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
        validator(image) {
          return /http[s]?:\/\/(www.)?[\S]+\.[a-z]+[\S]*/gi.test(image);
        },
        message: 'Некорректный формат URL',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(link) {
          return /http[s]?:\/\/(www.)?[\S]+\.[a-z]+[\S]*/gi.test(link);
        },
        message: 'Некорректный формат URL',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(link) {
          return /http[s]?:\/\/(www.)?[\S]+\.[a-z]+[\S]*/gi.test(link);
        },
        message: 'Некорректный формат URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
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
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
