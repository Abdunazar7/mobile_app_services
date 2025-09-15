const ApiError = require("../../helpers/api.error");
const logger = require("../../services/logger.service");

module.exports = function (err, req, res, next) {
  logger.error(err.message, { metadata: { stack: err.stack } });

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({ messages });
  }

  return res.status(500).json({ message: "An unexpected internal server error occurred." });
};
