const { sendErrorResponse } = require("../../helpers/send.response.errors");

module.exports = async (req, res, next) => {
  try {
    if (req.author) {
      if (req.params.id != req.author.id) {
        return sendErrorResponse(
          { message: "Only personal data is allowed" },
          res,
          403
        );
      }
      return next();
    }

    if (req.admin) {
      if (!req.admin.is_creator) {
        return sendErrorResponse(
          { message: "Only creator admin can perform this action" },
          res,
          403
        );
      }
      return next();
    }

    return sendErrorResponse({ message: "Unauthorized" }, res, 401);
  } catch (error) {
    console.log(error);
    sendErrorResponse(error, res, 403);
  }
};
