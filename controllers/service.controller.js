const { MobileAppService } = require("../models/index.models");
const { sendErrorResponse } = require("../helpers/send.response.errors");

// Create
const addMobileAppService = async (req, res) => {
  try {
    // Muhim: owner_id avtorizatsiya qilingan foydalanuvchidan (provider) olinishi kerak.
    // Bu middleware orqali req.user ga joylashtiriladi.
    const owner_id = req.user.id; // Misol uchun

    const newService = await MobileAppService.create({
      ...req.body,
      owner_id: owner_id,
    });
    res.status(201).json({ message: "New service added", data: newService });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get all
const getMobileAppServices = async (req, res) => {
  try {
    const services = await MobileAppService.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: services });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get one
const getOneMobileAppService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await MobileAppService.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Successfully retrieved", data: service });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update
const updateMobileAppService = async (req, res) => {
  try {
    const { id } = req.params;
    // Avtorizatsiya: Faqat xizmat egasi yoki admin o'zgartira olishi kerak
    const [rows, [updatedService]] = await MobileAppService.update(req.body, {
      where: { id /*, owner_id: req.user.id */ }, // Tekshiruv qo'shilishi kerak
      returning: true,
    });
    if (rows === 0) {
      return res
        .status(404)
        .json({ message: "Service not found or not permitted" });
    }
    res
      .status(200)
      .json({ message: "Service data updated", data: updatedService });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete
const deleteMobileAppService = async (req, res) => {
  try {
    const { id } = req.params;
    // Avtorizatsiya: Faqat xizmat egasi yoki admin o'chira olishi kerak
    const deleted = await MobileAppService.destroy({
      where: { id /*, owner_id: req.user.id */ },
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Service not found or not permitted" });
    }
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  addMobileAppService,
  getMobileAppServices,
  getOneMobileAppService,
  updateMobileAppService,
  deleteMobileAppService,
};
