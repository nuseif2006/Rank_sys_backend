const Database = require("better-sqlite3");

const db = new Database("app.db");
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    pass TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL
  )
`);

module.exports = db;