const { Status } = require("../models/index.models");
const { sendErrorResponse } = require("../helpers/send.response.errors");

// Create
const addStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const candidate = await Status.findOne({ where: { name } });
    if (candidate) {
      return res.status(400).json({ message: "Status already exists" });
    }
    const newStatus = await Status.create({ name });
    res.status(201).json({ message: "New status added", data: newStatus });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all
const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: statuses });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get one
const getOneStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json({ message: "Successfully retrieved", data: status });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedStatus]] = await Status.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json({ message: "Status data updated", data: updatedStatus });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete
const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Status.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json({ message: "Status deleted" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addStatus,
  getStatuses,
  getOneStatus,
  updateStatus,
  deleteStatus,
};
