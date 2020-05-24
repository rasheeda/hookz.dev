const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

var mysqlPoolConnection  = mysql.createPool({
  connectionLimit : 100,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

mysqlPoolConnection.getConnection(function(err, connection) {
    if (err) {
        console.error("error connecting: " + err.stack);

        if(typeof connection !== 'undefined' && connection) {
          connection.release();
        }

        return;
    }

    console.log("mysql pool connected successfully");
});

module.exports = mysqlPoolConnection;
