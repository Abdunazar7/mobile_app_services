const { Client } = require("../models/index.models");
const { sendErrorResponse } = require("../helpers/send.response.errors");
const bcrypt = require("bcrypt");

// Create
const addClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await Client.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).json({ message: "Client already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = await Client.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({ message: "New client added", data: newClient });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all
const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: clients });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get one
const getOneClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Successfully retrieved", data: client });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.password) {
      delete req.body.password;
    }
    const [rows, [updatedClient]] = await Client.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client data upadated", data: updatedClient });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Client.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addClient,
  getClients,
  getOneClient,
  updateClient,
  deleteClient,
};