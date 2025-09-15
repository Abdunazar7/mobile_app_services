const { MobileAppService } = require("../../models/index.models");
const { sendErrorResponse } = require("../../helpers/send.response.errors");

module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role === "admin") {
      return next();
    }
    
    const service = await MobileAppService.findByPk(id);
    if (!service) {
      return sendErrorResponse(res, { message: "Service not founds" }, 404);
    }

    if (service.owner_id !== user.id) {
      return sendErrorResponse(res, { message: "User unathorized" }, 403);
    }

    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
