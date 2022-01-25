const mysql = require("mysql2/promise");
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "student",
    password: '',
    waitForConnections: true,
    connectionLimit: 30,
    dateStrings: true,
});
module.exports = pool;