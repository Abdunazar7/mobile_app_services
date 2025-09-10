const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const mainRouter = require("./routes/index.routes");
const cookieParser = require("cookie-parser");

const PORT = config.get("port") ?? 3333;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api", mainRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
