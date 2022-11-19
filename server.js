const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const churchesDB = require("./database/churchesDB.json");

// app.use(bodyParser);
module.exports = app;

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});

app.get("/", (req, res, next) => {
  res.send({ quantity: churchesDB.length, data: churchesDB });
  console.log("Funcionou!");
});

app.get();
