const mysql = require("mysql2/promise");

async function connect() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "churches",
  });
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function disconnect() {
  const connection = await this.connection.end();
  console.log("Desconectou no MySQL!");
  return connection;
}

async function runQuery(query, data) {
  const executeQuery = await this.connection.execute(query, data);
  return executeQuery;
}

module.exports = { connect, disconnect, runQuery };
