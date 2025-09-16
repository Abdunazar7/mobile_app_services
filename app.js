const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const mainRouter = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
const errorHandling = require("./middlewares/errors/error-handling");

const PORT = config.get("port") ?? 3333;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api", mainRouter);

app.use(errorHandling)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
