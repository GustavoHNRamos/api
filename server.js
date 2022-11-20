const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const churchesDB = require("./database/churchesDB.json");
const { getChurches } = require("./controllers/church.js");
const router = require("./router/churches");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
module.exports = app;

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});

app.use("/", router);
