const ApiError = require("../../helpers/api.error");
const { MobileAppService } = require("../../models/index.models");

module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role === "admin") {
      return next();
    }
    
    const service = await MobileAppService.findByPk(id);
    if (!service) {
      ApiError.notFound("Service not found")
    }

    if (service.owner_id !== user.id) {
      ApiError.notFound("Provider not found")
    }

    next();
  } catch (error) {
      next(error)
  }
};
