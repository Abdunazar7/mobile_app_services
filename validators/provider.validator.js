const Joi = require("joi");

const createProviderSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  phone: Joi.string().pattern(/^998[0-9]{9}$/).required()
    .messages({ "string.pattern.base": "Telefon raqam '998xxxxxxxxx' formatida bo'lishi kerak." }),
  address: Joi.string().min(5).required(),
});

const updateProviderSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).optional(),
  description: Joi.string().min(10).optional(),
  phone: Joi.string().pattern(/^998[0-9]{9}$/).optional()
    .messages({ "string.pattern.base": "Telefon raqam '998xxxxxxxxx' formatida bo'lishi kerak." }),
  address: Joi.string().min(5).optional(),
  is_active: Joi.boolean().optional(),
}).min(1);

module.exports = {
  createProviderSchema,
  updateProviderSchema,
};
