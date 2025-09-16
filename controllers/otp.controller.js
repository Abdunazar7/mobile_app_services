const config = require("config");
const nodemailer = require("nodemailer");
const { totp } = require("otplib");

totp.options = { step: 300, digits: 6 };

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("EMAIL"),
    pass: config.get("EMAIL_PASS"),
  },
});

const send = async (req, res) => {
  const { email } = req.body;
  const otp = totp.generate(email + (config.get("OTP_SECRET_KEY") || "birnima"));

  try {
    await emailTransporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verification",
      text: `Your OTP code is ${otp}`,
    });

    res.json({ message: `Otp sent to ${email}` });
  } catch (e) {
    console.error("Email sending error:", e);
    res.status(500).json({ message: "Failed to send OTP", error: e.message });
  }
};

const verify = (req, res) => {
  const { otp, email } = req.body;
  const isValid = totp.check(
    otp,
    email + (config.get("OTP_SECRET_KEY") || "birnima")
  );

  if (!isValid) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified successfully", verify: true });
};

module.exports = { send, verify };
