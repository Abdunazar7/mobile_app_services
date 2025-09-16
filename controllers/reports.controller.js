const sequelize = require("../config/db");
const ApiError = require("../helpers/api.error");

const getServicesByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate)
      throw ApiError.badRequest("startDate/endDate kerak");

    const sql = `
      SELECT c.id AS contract_id,
             c.start_date,
             m.id   AS service_id,
             m.app_type,
             m.platform,
             cl.id  AS client_id,
             cl.full_name AS client_name
      FROM contracts c
      JOIN mobile_app_services m ON c.service_id = m.id
      JOIN clients cl ON c.client_id = cl.id
      WHERE c.start_date BETWEEN '${startDate}' AND '${endDate}'
      ORDER BY c.start_date ASC;
    `;

    const [rows] = await sequelize.query(sql);
    res.json({
      message: "Successfully retrieved used services in the date range.",
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

const getClientsByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate)
      throw ApiError.badRequest("startDate/endDate kerak");

    const sql = `
      SELECT DISTINCT cl.id, cl.full_name, cl.email, cl.phone
      FROM clients cl
      JOIN contracts c ON c.client_id = cl.id
      WHERE c.start_date BETWEEN '${startDate}' AND '${endDate}';
    `;

    const [rows] = await sequelize.query(sql);
    res.json({
      message:
        "Successfully retrieved clients who used services in the date range.",
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

const getClientsWhoCancelledByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      throw ApiError.badRequest("Please provide both startDate and endDate.");
    }

    const sql = `
      SELECT DISTINCT
        cl.id         AS client_id,
        cl.full_name  AS full_name,
        cl.email      AS email,
        c.id          AS contract_id,
        c."updatedAt" AS cancelled_at
      FROM contracts AS c
      JOIN clients  AS cl ON cl.id = c.client_id
      JOIN statuses AS s  ON s.id = c.status_id
      WHERE s.name = 'cancelled'
        AND c."updatedAt" BETWEEN '${startDate}' AND '${endDate}'
      ORDER BY c."updatedAt" DESC;
    `;

    const [rows] = await sequelize.query(sql);

    res.status(200).json({
      message: "Clients who cancelled services in the date range.",
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

const getTopOwnersByService = async (req, res, next) => {
  try {
    const { service_name } = req.body;

    const sql = `
      SELECT p.id AS provider_id,
             p.full_name,
             COUNT(c.id) AS contracts_count
      FROM providers p
      JOIN contracts c ON p.id = c.owner_id
      JOIN mobile_app_services m ON c.service_id = m.id
      WHERE m.app_type = '${service_name}'
      GROUP BY p.id
      ORDER BY contracts_count DESC
      LIMIT 10;
    `;

    const [rows] = await sequelize.query(sql);
    res.json({
      message: `List of providers for service ${service_name}`,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

const getPaymentHistoryByClient = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    const query = `
      SELECT
        p.id AS payment_id,
        p.amount,
        p.paid_at,
        p.method,
        s.app_type AS service_type,
        s.platform AS service_platform,
        pr.full_name AS owner_name
      FROM
        payments AS p
      JOIN
        contracts AS c ON p.contract_id = c.id
      JOIN
        mobile_app_services AS s ON c.service_id = s.id
      JOIN
        providers AS pr ON c.owner_id = pr.id
      WHERE
        c.client_id = ${clientId}
      ORDER BY
        p.paid_at DESC;
    `;

    const [rows] = await sequelize.query(query);

    res.status(200).json({
      message: `Successfully retrieved payment history for client ID ${clientId}.`,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServicesByDateRange,
  getClientsByDateRange,
  getClientsWhoCancelledByDateRange,
  getTopOwnersByService,
  getPaymentHistoryByClient,
};
