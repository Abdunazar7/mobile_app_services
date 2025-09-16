module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const { user } = req;
    if (user && allowedRoles.includes(user.role)) {
      next();
    } else {
      next(error)
    }
  };
};
