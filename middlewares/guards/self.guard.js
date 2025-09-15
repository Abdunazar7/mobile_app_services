const { sendErrorResponse } = require("../../helpers/send.response.errors");

module.exports = (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  if (user.role === "admin") {
    return next();
  }

  if (user.id == id) {
    return next();
  }

  sendErrorResponse(
    res,
    {
      message:
        "Only personnel data is alowed",
    },
    403
  );
};
