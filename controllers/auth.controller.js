const { Admin, Client, Provider } = require(".././models/index.models");
const jwtService = require(".././services/jwt.service");
const bcrypt = require("bcrypt");
const config = require("config");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    console.log(admin);
    
    if (!admin) {
      return res.status(401).json({ message: "Invalid password or email 1" });
    }
    const isPassMatch = await bcrypt.compare(password, admin.password);
    if (!isPassMatch) {
      return res.status(401).json({ message: "Invalid password or email 2" });
    }
    const payload = {
      id: admin.id,
      role: "admin",
      is_creator: admin.is_creator,
    };
    const tokens = jwtService.generateTokens(payload);
    admin.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });
    res.status(200).json({ message: "Successfully logged in", accessToken: tokens.accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server errror" });
  }
};

const adminLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "Token not found" });
    }
    const payload = jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ message: "Token yaroqsiz" });
    }
    const admin = await Admin.findByPk(payload.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin topilmadi" });
    }
    admin.refresh_token = null;
    await admin.save();
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Tizimdan muvaffaqiyatli chiqildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverda xatolik" });
  }
};

const clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const isPassMatch = await bcrypt.compare(password, client.password);
    if (!isPassMatch) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const payload = {
      id: client.id,
      role: "client",
    };
    const tokens = jwtService.generateTokens(payload);
    client.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await client.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });
    res.status(200).json({ message: "Mijoz tizimga muvaffaqiyatli kirdi", accessToken: tokens.accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverda xatolik" });
  }
};

const clientLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "Token not found" });
    }
    const payload = jwtService.verifyRefreshToken(refreshToken);
    if (!payload || payload.role !== 'client') { // Rolni tekshirish
      return res.status(401).json({ message: "Invalid token" });
    }
    const client = await Client.findByPk(payload.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    client.refresh_token = null;
    await client.save();
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error)
 {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const providerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const provider = await Provider.findOne({ where: { email } });
    if (!provider) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const isPassMatch = await bcrypt.compare(password, provider.password);
    if (!isPassMatch) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const payload = {
      id: provider.id,
      role: "provider",
    };
    const tokens = jwtService.generateTokens(payload);
    provider.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await provider.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });
    res.status(200).json({ message: "Provider successfully logged in", accessToken: tokens.accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const providerLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "Token not found" });
    }
    const payload = jwtService.verifyRefreshToken(refreshToken);
    if (!payload || payload.role !== 'provider') {
      return res.status(401).json({ message: "Invalid token" });
    }
    const provider = await Provider.findByPk(payload.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    provider.refresh_token = null;
    await provider.save();
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "Token not found" });
    }

    const payload = jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    let Model;
    switch (payload.role) {
      case "admin":
        Model = Admin;
        break;
      case "provider":
        Model = Provider;
        break;
      case "client":
        Model = Client;
        break;
      default:
        return res.status(401).json({ message: "Invalid role" });
    }

    const user = await Model.findByPk(payload.id);
    if (!user || !user.refresh_token) {
      return res.status(401).json({ message: "User not found or left the system" });
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid token. Login first." });
    }

    const newPayload = { id: user.id, role: payload.role };
    if (payload.role === "admin") {
      newPayload.is_creator = user.is_creator;
    }

    const tokens = jwtService.generateTokens(newPayload);
    user.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Refresh token updated",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
  clientLogin,
  clientLogout,
  providerLogin,
  providerLogout,
  refreshToken
};