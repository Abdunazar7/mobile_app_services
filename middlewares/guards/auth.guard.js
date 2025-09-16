const { error } = require("winston");
const jwtService = require("../../services/jwt.service");
const ApiError = require("../../helpers/api.error");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      ApiError.badRequest("Header not found");
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      ApiError.badRequest("Token not found");
    }

    const decodedPayload = await jwtService.verifyAccessToken(token);

    if (!decodedPayload) {
      ApiError.badRequest("Payload not found");
    }

    req.user = decodedPayload;
    next();
  } catch (error) {
    next(error);
  }
};
