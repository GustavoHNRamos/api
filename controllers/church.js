const churchesDB = require("../database/churchesDB.json");
const sendChurch = require("../helper/sendChurch");
const { responseAPI } = require("../utils/response");
const { connect, disconnect, runQuery } = require("../database/index");
const dayjs = require("dayjs");

const dateNow = dayjs().toISOString();

const createChurch = async (req, res, next) => {
  try {
    await connect();
    const { name, email, phone, address, city } = req.body;

    if (!name || !email || !phone || !address || !city) {
      return responseAPI(res, true, "Required data missing");
    }

    const query =
      "insert into churches (name, address, city, email, phone, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?)";

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

const getChurches = (req, res, next) => {
  res.send(
    sendChurch(
      `We found ${churchesDB.length} churches`,
      churchesDB,
      churchesDB.length
    )
  );
  next();
};

const getChurchById = (req, res, next) => {
  const churchId = req.params.id;
  const findChurch = churchesDB.find((church) => church.id === churchId);
  console.log(findChurch);
  res.send(sendChurch(`We found ${findChurch.name}`, findChurch));
  next();
};

const updateChurch = (req, res, next) => {
  const churchId = req.params.id;
  const body = req.body;
  const findChurch = churchesDB.findIndex((church) => church.id === churchId);

  // churchesDB.forEach((e) => {
  //   Object.entries(e).forEach(([key, value]) => {
  //     if (churchesDB[value]) {
  //       e[key] = findChurch[value];
  //     }
  //   });
  // });

  console.log(findChurch);
  res.send(body);
  next();
};

const deleteChurch = (req, res, next) => {
  const churchId = req.params.id;
  const objWithIdIndex = churchesDB.findIndex((obj) => obj.id === churchId);
  churchesDB.splice(objWithIdIndex, 1);
  res.send(churchesDB);
  next();
};

module.exports = {
  createChurch,
  getChurches,
  getChurchById,
  updateChurch,
  deleteChurch,
};
