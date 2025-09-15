const { sendErrorResponse } = require("../../helpers/send.response.errors");

module.exports = (req, res, next) => {
  const { user } = req;

  if (user && user.role === 'admin' && user.is_creator) {
    return next();
  }

  sendErrorResponse(
    res,
    { message: "Only super admin permitted" },
    403
  );
};
