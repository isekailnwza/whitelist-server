const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

const ADMIN_KEY = process.env.ADMIN_KEY || "supersecretkey";

// เพิ่ม/แก้ placeId
app.post("/set", (req, res) => {
  const auth = req.headers["authorization"];
  if (auth !== `Bearer ${ADMIN_KEY}`) return res.status(403).json({ error: "Forbidden" });

  const { placeId, whitelisted } = req.body;
  db.run(
    `INSERT INTO whitelist(placeId, whitelisted) VALUES(?, ?)
     ON CONFLICT(placeId) DO UPDATE SET whitelisted = excluded.whitelisted`,
    [placeId, whitelisted ? 1 : 0],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ placeId, whitelisted });
    }
  );
});

// เช็ค placeId
app.get("/check/:placeId", (req, res) => {
  db.get(
    `SELECT whitelisted FROM whitelist WHERE placeId = ?`,
    [req.params.placeId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.json({ placeId: req.params.placeId, whitelisted: false });
      res.json({ placeId: req.params.placeId, whitelisted: row.whitelisted === 1 });
    }
  );
});

// ดึง whitelist ทั้งหมด
app.get("/all", (req, res) => {
  db.all("SELECT placeId, whitelisted FROM whitelist", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const result = {};
    rows.forEach(r => result[r.placeId] = r.whitelisted === 1);
    res.json(result);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
