const Joi = require("joi");

const updateProfileValidator = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    }),
};
const getProfileValidator = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().min(24).max(24),
    }),
};
const emailValidator = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    }),
};
const resetValidator = {
  body: Joi.object()
    .required()
    .keys({
      password: Joi.string()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
        .required(),
      cPassword: Joi.string().valid(Joi.ref("password")).required(),
    }),
  params: Joi.object().required().keys({
    token: Joi.string().required(),
  }),
};
const changePasswordValidator = {
  body: Joi.object()
    .required()
    .keys({
      currentPassword: Joi.string()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
        .required(),
      password: Joi.string()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
        .required(),
      cPassword: Joi.string().valid(Joi.ref("password")).required(),
    }),
};
module.exports = {
  updateProfileValidator,
  getProfileValidator,
  emailValidator,
  resetValidator,
  changePasswordValidator,
};
