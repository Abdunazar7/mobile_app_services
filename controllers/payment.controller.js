const { Payment } = require("../models/index.models");
const { sendErrorResponse } = require("../helpers/send.response.errors");

// Create
const addPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json({ message: "Payment received", data: newPayment });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all
const getPayments = async (req, res) => {
  try {
    // Bu yerda ham filtrlash kerak (masalan, ma'lum bir shartnoma bo'yicha)
    const payments = await Payment.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: payments });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get one
const getOnePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Successfully retrieved", data: payment });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// UPDATE payment by ID
// Izoh: Moliyaviy yozuvlarni o'zgartirish tavsiya etilmaydi.
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedPayment]] = await Payment.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment data updated", data: updatedPayment });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// DELETE payment by ID
// Izoh: Moliyaviy yozuvlarni o'chirish tavsiya etilmaydi.
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Payment.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addPayment,
  getPayments,
  getOnePayment,
  updatePayment,
  deletePayment,
};