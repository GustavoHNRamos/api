require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router/churches");
const multer = require("multer");
const upload = multer();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
module.exports = app;

app.use(router);

app.listen(3000, () => {
  console.log(`Server rodando na porta ${3000}`);
});
