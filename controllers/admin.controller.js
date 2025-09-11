const { Admin } = require("../models/index.models");
const { sendErrorResponse } = require("../helpers/send.response.errors");
const bcrypt = require("bcrypt");

// Create
const addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await Admin.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({ message: "New admin added", data: newAdmin });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: Admin });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get one
const getOneAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedAdmin]] = await Admin.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin data updated", data: updatedAdmin });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Admin.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
};
