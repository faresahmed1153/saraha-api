const Joi = require('joi');


const signUpValidator = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string()
        .required()
        .messages({
          "string.empty": "pls fill in ur name",
          "any.required": "pls send ur name",
          "string.pattern.base": "pls enter valid name ",
        }),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          )
        )
        .required(),
    }),
};


const loginValidator = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          )
        )
        .required(),
    }),
};


module.exports = {
    signUpValidator,
    loginValidator
}