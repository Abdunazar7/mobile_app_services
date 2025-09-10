const sendErrorResponse = (error, res, status) => {
  console.log(error);
  res.status(status).send({
    message: "Error occured",
    error: error.message,
  });
};

module.exports = {
  sendErrorResponse,
};
