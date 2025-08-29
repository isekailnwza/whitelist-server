const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./whitelist.db");

// สร้างตาราง whitelist ถ้ายังไม่มี
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS whitelist (
      placeId TEXT PRIMARY KEY,
      whitelisted INTEGER
    )
  `);
});

module.exports = db;
