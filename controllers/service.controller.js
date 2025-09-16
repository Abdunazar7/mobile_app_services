const { MobileAppService } = require("../models/index.models");

// Create
const addMobileAppService = async (req, res, next) => {
  try {
    const newService = await MobileAppService.create({
      provider_id: req.user.id,
      app_type: req.body.app_type,
      platform: req.body.platform,
      price: req.body.price,
      duration_days: req.body.duration_days,
      description: req.body.description,
      features: req.body.features,
    });
    res.status(201).json({ message: "New service added", data: newService });
  } catch (error) {
    next(error);
  }
};

// Get all
const getMobileAppServices = async (req, res, next) => {
  try {
    const services = await MobileAppService.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: services });
  } catch (error) {
    next(error);
  }
};

// Get one
const getOneMobileAppService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await MobileAppService.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Successfully retrieved", data: service });
  } catch (error) {
    next(error);
  }
};

// Update
const updateMobileAppService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedService]] = await MobileAppService.update(req.body, {
      where: { id },
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
    next(error);
  }
};

// Delete
const deleteMobileAppService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await MobileAppService.destroy({
      where: { id },
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Service not found or not permitted" });
    }
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMobileAppService,
  getMobileAppServices,
  getOneMobileAppService,
  updateMobileAppService,
  deleteMobileAppService,
};
