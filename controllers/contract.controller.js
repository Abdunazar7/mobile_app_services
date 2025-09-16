const { Contract, MobileAppService, Status } = require("../models/index.models");

// Create
const addContract = async (req, res, next) => {
  try {
    const { owner_id, service_id, client_id, start_date } = req.body;

    const service = await MobileAppService.findByPk(service_id);
    if (!service || service.provider_id !== owner_id) {
        return res.status(404).json({ message: "Service or provider not found"});
    }

    const initialStatus = await Status.findOne({ where: { name: 'pending' }});
    if (!initialStatus) {
        return res.status(500).json({ message: "Cannot get initial status"});
    }

    const contractStartDate = new Date(start_date);

    const endDate = new Date(contractStartDate.setDate(contractStartDate.getDate() + service.duration_days));

    const newContract = await Contract.create({
      ...req.body,
      client_id: client_id,
      total_price: service.price,
      status_id: initialStatus.id,
      end_date: endDate, 
    });
    res.status(201).json({ message: "A new contract was concluded", data: newContract });
  } catch (error) {
    next(error);
  }
};

// Get all
const getContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.findAll({ include: [{ all: true }] });
    res.status(200).json({ message: "Successfully retrieved", data: contracts });
  } catch (error) {
    next(error);
  }
};

// Get one
const getOneContract = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id, { include: [{ all: true }] });
    if (!contract) {
      return res.status(404).json({ message: "Shartnoma topilmadi" });
    }
    res.status(200).json({ message: "Shartnoma topildi", data: contract });
  } catch (error) {
    next(error);
  }
};

// Update
const updateContract = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedContract]] = await Contract.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).json({ message: "Contract not found" });
    }
    res.status(200).json({ message: "Contract updated", data: updatedContract });
  } catch (error) {
    next(error);
  }
};

// Delete
const deleteContract = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Contract.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Contract not found" });
    }
    res.status(200).json({ message: "Contract deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContract,
  getContracts,
  getOneContract,
  updateContract,
  deleteContract,
};