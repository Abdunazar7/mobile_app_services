const Joi = require("joi");

const createContractSchema = Joi.object({
  owner_id: Joi.number().integer().positive().required(),
  client_id: Joi.number().integer().positive().required(),
  service_id: Joi.number().integer().positive().required(),
  start_date: Joi.date().optional(),
});

const updateContractSchema = Joi.object({
  status_id: Joi.number().integer().positive().optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().greater(Joi.ref('start_date')).optional(),
}).min(1);

module.exports = {
  createContractSchema,
  updateContractSchema,
};