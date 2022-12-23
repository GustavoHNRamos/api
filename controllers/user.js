const { responseAPI } = require("../utils/response");
const { connect, disconnect, runQuery } = require("../database/index");
const dayjs = require("dayjs");

const dateNow = dayjs().toISOString();

const createUser = async (req, res, next) => {
  try {
    await connect();
    const { name, email, password, phone, address, city } = req.body;

    if (!name || !email || !password || !phone || !address || !city) {
      return responseAPI(res, true, "Required data missing.", 0, req.body);
    }

    const query =
      "INSERT INTO users (name, email, password, phone, address, city, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const save = await runQuery(query, [
      name,
      email,
      password,
      phone,
      address,
      city,
      dateNow,
      dateNow,
    ]);

    await disconnect();

    return responseAPI(
      res,
      false,
      "User created",
      save[0].affectedRows,
      req.body
    );
  } catch (error) {
    return responseAPI(res, true, error);
  }
  next();
};

const updateUser = async (req, res, next) => {
  try {
    await connect();

    const body = req.body;
    const userId = req.params.id;

    let fields = [];
    for (key in body) {
      fields.push(`${key} = '${body[key]}'`);
    }

    let query = `
      UPDATE users
      SET ${fields}
      WHERE id = ${userId};
    `;

    const save = await runQuery(query, [userId]);

    await disconnect();

    return responseAPI(
      res,
      false,
      "User successfully updated",
      save[0].affectedRows
    );
  } catch (error) {
    return responseAPI(res, true, error);
  }
  next();
};

const deleteUser = async (req, res, next) => {
  try {
    await connect();

    const userId = req.params.id;

    if (userId === null) {
      return responseAPI(res, true, "ID missing");
    }

    const query = "DELETE FROM users WHERE id = ?";

    const save = await runQuery(query, [userId]);

    await disconnect();

    return responseAPI(res, false, "User successfully deleted");
  } catch (error) {
    return responseAPI(res, true, error);
  }
  next();
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
