const { Provider } = require("../models/index.models");
const bcrypt = require("bcrypt");

// Create
const addProvider = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const candidate = await Provider.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).json({ message: "Provider already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newProvider = await Provider.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({ message: "New provider added", data: newProvider });
  } catch (error) {
    next(error);
  }
};

// Get all
const getProviders = async (req, res, next) => {
  try {
    const providers = await Provider.findAll();
    res
      .status(200)
      .json({ message: "Successfully retrieved", data: providers });
  } catch (error) {
    next(error);
  }
};

// Get one
const getOneProvider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByPk(id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json({ message: "Successfully retrieved", data: provider });
  } catch (error) {
    next(error);
  }
};

// Update
const updateProvider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedProvider]] = await Provider.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res
      .status(200)
      .json({ message: "Provider data updated", data: updatedProvider });
  } catch (error) {
    next(error);
  }
};

// Delete
const deleteProvider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Provider.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json({ message: "Provider deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProvider,
  getProviders,
  getOneProvider,
  updateProvider,
  deleteProvider,
};
