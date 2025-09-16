const { Payment } = require("../models/index.models");

// Create
const addPayment = async (req, res, next) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json({ message: "Payment received", data: newPayment });
  } catch (error) {
    next(error);
  }
};

// Get all
const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: payments });
  } catch (error) {
    next(error);
  }
};

// Get one
const getOnePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Successfully retrieved", data: payment });
  } catch (error) {
    next(error);
  }
};

// Update
const updatePayment = async (req, res, next) => {
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
    next(error);
  }
};

// Delete
const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Payment.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPayment,
  getPayments,
  getOnePayment,
  updatePayment,
  deletePayment,
};