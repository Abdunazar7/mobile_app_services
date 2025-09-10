const { sendErrorResponse } = require("../../helpers/send.response.errors");
const jwtService = require("../../services/jwt.service");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return sendErrorResponse({ message: "Auth header not found" }, res, 401);
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return sendErrorResponse({ message: "Token not found" }, res, 401);
    }

    const verifiedAccessToken = await jwtService.verifyAccessToken(token);
    req.author = verifiedAccessToken;

    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
