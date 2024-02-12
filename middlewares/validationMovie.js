const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const checkUrl = (url) => {
  if (!isUrl(url, { require_protocol: true })) {
    throw new Error('Некорректный формат URL');
  }
  return url;
};

const validationMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkUrl, 'Некорректный формат URL'),
    trailerLink: Joi.string().required().custom(checkUrl, 'Некорректный формат URL'),
    thumbnail: Joi.string().required().custom(checkUrl, 'Некорректный формат URL'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationMoviedId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validationMovie,
  validationMoviedId,
};
