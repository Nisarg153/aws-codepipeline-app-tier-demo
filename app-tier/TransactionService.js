const getDbConfig = require('./DbConfig');
const mysql = require('mysql');

let con;

/**
 * Initialize DB connection using secrets
 */
async function initDbConnection() {
  if (con) return con; // Reuse existing connection
  const dbcreds = await getDbConfig();

  con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
  });

  con.connect((err) => {
    if (err) throw err;
    console.log('Connected to DB.');
  });

  return con;
}

// Transaction functions
async function addTransaction(amount, desc) {
  const conn = await initDbConnection();
  const sql = `INSERT INTO transactions (amount, description) VALUES ('${amount}', '${desc}')`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Added transaction.");
  });
  return 200;
}

async function getAllTransactions(callback) {
  const conn = await initDbConnection();
  const sql = "SELECT * FROM transactions";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Getting all transactions...");
    return callback(result);
  });
}

async function findTransactionById(id, callback) {
  const conn = await initDbConnection();
  const sql = `SELECT * FROM transactions WHERE id = ${id}`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`Retrieving transaction with id ${id}`);
    return callback(result);
  });
}

async function deleteAllTransactions(callback) {
  const conn = await initDbConnection();
  const sql = "DELETE FROM transactions";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Deleted all transactions.");
    return callback(result);
  });
}

async function deleteTransactionById(id, callback) {
  const conn = await initDbConnection();
  const sql = `DELETE FROM transactions WHERE id = ${id}`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`Deleted transaction with id ${id}`);
    return callback(result);
  });
}

module.exports = {
  addTransaction,
  getAllTransactions,
  deleteAllTransactions,
  findTransactionById,
  deleteTransactionById
};
