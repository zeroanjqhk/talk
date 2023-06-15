const mysql = require("mysql2/promise");

async function init() {
  const dbInfo = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "chatting"
  };

  const connection = await mysql.createConnection(dbInfo);
  return connection;
}

module.exports = { init };