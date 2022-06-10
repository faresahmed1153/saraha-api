const Joi = require("joi");

const sendMessage = {
  body: Joi.object()
    .required()
    .keys({
      messageBody: Joi.string().min(5).max(50000),
    }),
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().min(24).max(24),
    }),
};

const deleteMessage = {
  params: Joi.object()
    .required()
    .keys({
      id: Joi.string().min(24).max(24),
    }),
};

module.exports = {
  sendMessage,
  deleteMessage,
};
