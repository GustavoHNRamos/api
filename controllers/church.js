const { responseAPI } = require("../utils/response");
const { connect, disconnect, runQuery } = require("../database/index");
const dayjs = require("dayjs");

const dateNow = dayjs().toISOString();

const createChurch = async (req, res, next) => {
  try {
    await connect();
    const { name, email, phone, address, city } = req.body;

    if (!name || !email || !phone || !address || !city) {
      return responseAPI(res, true, "Required data missing.");
    }

    const query =
      "INSERT INTO churches (name, address, city, email, phone, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const save = await runQuery(query, [
      name,
      address,
      city,
      email,
      phone,
      dateNow,
      dateNow,
    ]);

    await disconnect();

    return responseAPI(
      res,
      false,
      "Church created",
      save[0].affectedRows,
      req.body
    );
  } catch (error) {
    console.log(error);
  }
  next();
};

const getChurches = async (req, res, next) => {
  try {
    await connect();

    const query = "SELECT * FROM `churches` LIMIT 0, 1000";

    const save = await runQuery(query);

    await disconnect();

    return responseAPI(res, false, "Churches found", save[0].length, save[0]);
  } catch (error) {
    return responseAPI(res, true, "Unable to find churches.");
  }
  next();
};

const getChurchById = async (req, res, next) => {
  try {
    await connect();

    const churchId = req.params.id;

    if (churchId === null) {
      return responseAPI(res, true, "ID missing");
    }

    const query = "SELECT * FROM `churches` WHERE id = ?";

    const save = await runQuery(query, [churchId]);

    await disconnect();

    return responseAPI(res, false, "Church found", save[0].length, save[0]);
  } catch (error) {
    console.log(error);
  }
  next();
};

// if (churchId === null || req.body === null) {
//   return responseAPI(res, true, "Information missing");
// }

const updateChurch = async (req, res, next) => {
  try {
    await connect();

    const churchId = req.params.id;

    const query = "UPDATE churches SET ? = ? WHERE id = ?";

    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const save = await runQuery(query, [keys, values, churchId]);

    console.log(Object.keys(req.body));

    await disconnect();

    return responseAPI(res, false, "Church successfully updated");
  } catch (error) {
    console.log(error);
  }
  next();
};

const deleteChurch = async (req, res, next) => {
  try {
    await connect();

    const churchId = req.params.id;

    if (churchId === null) {
      return responseAPI(res, true, "ID missing");
    }

    const query = "DELETE FROM churches WHERE id = ?";

    const save = await runQuery(query, [churchId]);

    await disconnect();

    return responseAPI(res, false, "Church successfully deleted");
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = {
  createChurch,
  getChurches,
  getChurchById,
  updateChurch,
  deleteChurch,
};
