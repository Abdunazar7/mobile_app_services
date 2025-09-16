const { error } = require("winston");

module.exports = (req, res, next,) => {
  const { user } = req;

  if (user && user.role === 'admin' && user.is_creator) {
    return next();
  }else{
    next(error)
  }
};
