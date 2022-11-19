const churchesDB = require("../database/churchesDB.json");

function getChurches(req, res) {
  res.send = { quantity: churchesDB.length };
}

module.exports = { getChurches };
