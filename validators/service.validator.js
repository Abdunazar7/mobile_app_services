// /src/validations/mobileAppService.validation.js
const Joi = require("joi");

const createServiceSchema = Joi.object({
  app_type: Joi.string().min(3).max(100).required(),
  platform: Joi.string().min(2).max(50).required(),
  price: Joi.number().positive().required(), // Narx musbat son bo'lishi kerak
  duration_days: Joi.number().integer().positive().required(), // Muddat musbat butun son
  description: Joi.string().optional(),
  features: Joi.number().integer().positive().required(),
});

const updateServiceSchema = Joi.object({
  app_type: Joi.string().min(3).max(100).optional(),
  platform: Joi.string().min(2).max(50).optional(),
  price: Joi.number().positive().optional(),
  duration_days: Joi.number().integer().positive().optional(),
  description: Joi.string().optional(),
  features: Joi.number().integer().positive().optional(),
}).min(1);

module.exports = {
  createServiceSchema,
  updateServiceSchema,
};