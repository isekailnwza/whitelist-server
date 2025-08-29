const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./whitelist.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS whitelist (
      placeId TEXT PRIMARY KEY,
      whitelisted INTEGER
    )
  `);
});

module.exports = db;
