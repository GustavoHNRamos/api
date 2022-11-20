const churchesDB = require("../database/churchesDB.json");
const sendChurch = require("../helper/sendChurch");

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
  const findChurch = churchesDB.find((church) => church.id === churchId);
  res.send(findChurch);
  next();
};

const deleteChurch = (req, res, next) => {
  const churchId = req.params.id;
  const objWithIdIndex = churchesDB.findIndex((obj) => obj.id === churchId);
  churchesDB.splice(objWithIdIndex, 1);
  res.send(churchesDB);
};

module.exports = { getChurches, getChurchById, updateChurch, deleteChurch };
