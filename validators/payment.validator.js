const Joi = require("joi");

const createPaymentSchema = Joi.object({
  contract_id: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  method: Joi.string().min(3).max(50).required(),
  paid_at: Joi.date().optional(),
});

const updatePaymentSchema = Joi.object({
  method: Joi.string().min(3).max(50).required(),
});

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
};
