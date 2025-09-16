const { Admin } = require("../models/index.models");
const bcrypt = require("bcrypt");

// Create
const addAdmin = async (req, res, next) => {
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
    next(error);
  }
};

// Get all
const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: admins});
  } catch (error) {
    next(error);
  }
};

// Get one
const getOneAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

// Update
const updateAdmin = async (req, res, next) => {
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
    next(error);
  }
};

// Delete
const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Admin.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
};
