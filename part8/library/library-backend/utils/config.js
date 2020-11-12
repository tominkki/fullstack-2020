require('dotenv').config();

const DB_URI = process.env.DB_URI;
const JWT_PASS = process.env.JWT_PASS;

module.exports = { DB_URI, JWT_PASS };
