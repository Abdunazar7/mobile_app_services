const Joi = require("joi");

const createStatusSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

const updateStatusSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
}).min(1);

module.exports = {
  createStatusSchema,
  updateStatusSchema,
};