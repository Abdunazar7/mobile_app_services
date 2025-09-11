// /src/validations/payment.validation.js
const Joi = require("joi");

const createPaymentSchema = Joi.object({
  contract_id: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  method: Joi.string().min(3).max(50).required(),
  paid_at: Joi.date().optional(), // Agar kiritilmasa, default qiymat oladi
});

// To'lovni o'zgartirish odatda mantiqqa to'g'ri kelmaydi,
// lekin agar kerak bo'lsa, faqat metodni o'zgartirish mumkin.
const updatePaymentSchema = Joi.object({
  method: Joi.string().min(3).max(50).required(),
});

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
};