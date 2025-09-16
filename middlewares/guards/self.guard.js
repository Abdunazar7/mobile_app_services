const { error } = require("winston");

module.exports = (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role === "admin") {
      return next();
    }

    if (user.id == id) {
      return next();
    }
  } catch (error) {
    next(error);
  }
};
