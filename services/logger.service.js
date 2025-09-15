const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: "Mobile-Service-API" }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    myFormat
  ),
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
  exitOnError: false,
});

logger.exceptions.handle(
  new transports.File({ filename: "logs/exceptions.log" })
);

logger.rejections.handle(
  new transports.File({ filename: "logs/rejections.log" })
);

module.exports = logger;
