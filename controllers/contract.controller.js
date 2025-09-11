const { Contract, MobileAppService, Status } = require("../models/index.models");
const { sendErrorResponse } = require("../helpers/send.response.errors");

// Create
const addContract = async (req, res) => {
  try {
    // client_id avtorizatsiya qilingan mijozdan olinadi
    const client_id = req.user.id;
    const { owner_id, service_id } = req.body;

    // 1. Xizmat narxini backend'dan olish (mijoz o'zi narx belgilay olmasligi uchun)
    const service = await MobileAppService.findByPk(service_id);
    if (!service || service.owner_id !== owner_id) {
        return res.status(404).json({ message: "Service or provider not found"});
    }

    // 2. Boshlang'ich statusni olish (masalan, 'pending')
    const initialStatus = await Status.findOne({ where: { name: 'pending' }});
    if (!initialStatus) {
        return res.status(500).json({ message: "Cannot get initial status"});
    }

    const newContract = await Contract.create({
      ...req.body,
      client_id: client_id,
      total_price: service.price, // Narxni xizmatdan olamiz
      status_id: initialStatus.id // Statusni bazadan olamiz
    });
    res.status(201).json({ message: "A new contract was concluded", data: newContract });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all
const getContracts = async (req, res) => {
  try {
    // Avtorizatsiya: Foydalanuvchi rolidan kelib chiqib filtrlash kerak
    const contracts = await Contract.findAll({ include: [{ all: true }] }); // Hamma bog'liq ma'lumotlar bilan
    res.status(200).json({ message: "Successfully retrieved", data: contracts });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get one
const getOneContract = async (req, res) => {
  try {
    const { id } = req.params;
    // Avtorizatsiya: Faqat aloqador foydalanuvchilar ko'ra olishi kerak
    const contract = await Contract.findByPk(id, { include: [{ all: true }] });
    if (!contract) {
      return res.status(404).json({ message: "Shartnoma topilmadi" });
    }
    res.status(200).json({ message: "Shartnoma topildi", data: contract });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update
const updateContract = async (req, res) => {
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
    sendErrorResponse(res, error);
  }
};

// Delete
const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contract.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Contract not found" });
    }
    res.status(200).json({ message: "Contract deleted" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addContract,
  getContracts,
  getOneContract,
  updateContract,
  deleteContract,
};