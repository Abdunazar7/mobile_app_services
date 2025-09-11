// /src/validations/client.validation.js
const Joi = require("joi");

const createClientSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().min(3).max(255).required(),
  phone: Joi.string().pattern(/^998[0-9]{9}$/).optional() // Mijoz uchun telefon ixtiyoriy
    .messages({ "string.pattern.base": "Telefon raqam '998xxxxxxxxx' formatida bo'lishi kerak." }),
});

const updateClientSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).optional(),
  phone: Joi.string().pattern(/^998[0-9]{9}$/).optional()
    .messages({ "string.pattern.base": "Telefon raqam '998xxxxxxxxx' formatida bo'lishi kerak." }),
  is_active: Joi.boolean().optional(),
}).min(1);

module.exports = {
  createClientSchema,
  updateClientSchema,
};