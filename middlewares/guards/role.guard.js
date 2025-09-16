const { sendErrorResponse } = require("../../helpers/send.response.errors");

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const { user } = req;
    if (user && allowedRoles.includes(user.role)) {
      next();
    } else {
      return sendErrorResponse({ message: "Unauthorized role" }, res, 401);
    }
  };
};
