const { sendErrorResponse } = require("../../helpers/send.response.errors");

module.exports = async (req, res, next) => {
  try {
    if (req.params.id != req.author.id) {
      return sendErrorResponse(
        { message: "Only personal data is allowed" },
        res,
        403
      );
    }
    next();
  } catch (error) {
    console.log(error);
    sendErrorResponse(error, res, 403);
  }
};
