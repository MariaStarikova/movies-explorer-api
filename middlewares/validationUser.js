const { celebrate, Joi } = require("celebrate");
// const isUrl = require("validator/lib/isURL");

// const checkUrl = (url) => {
//   if (!isUrl(url, { require_protocol: true })) {
//     throw new Error("Некорректный формат URL");
//   }
//   return url;
// };

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  validationUpdateUser,
};
