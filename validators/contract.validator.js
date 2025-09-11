// /src/validations/contract.validation.js
const Joi = require("joi");

const createContractSchema = Joi.object({
  owner_id: Joi.number().integer().positive().required(),
  service_id: Joi.number().integer().positive().required(),
  start_date: Joi.date().optional(),
});

// Shartnomani faqat Admin yoki Provider yangilay oladi (masalan, statusini o'zgartiradi)
const updateContractSchema = Joi.object({
  status_id: Joi.number().integer().positive().optional(),
  start_date: Joi.date().optional(),
  // Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak
  end_date: Joi.date().greater(Joi.ref('start_date')).optional(),
}).min(1);

module.exports = {
  createContractSchema,
  updateContractSchema,
};