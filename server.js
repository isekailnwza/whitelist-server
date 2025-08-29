const express = require("express");
const app = express();

app.use(express.json());

let config = {
  "123456789": { Whitelisted: false },
  "987654321": { Whitelisted: true }
};

app.get("/config", (req, res) => {
  res.json(config);
});

app.get("/config/:placeId", (req, res) => {
  const placeId = req.params.placeId;
  if (config[placeId]) return res.json(config[placeId]);
  res.status(404).json({ error: "PlaceId not found" });
});

app.post("/set", (req, res) => {
  const { placeId, whitelisted } = req.body;
  if (!placeId) return res.status(400).json({ error: "Missing placeId" });
  config[placeId] = { Whitelisted: Boolean(whitelisted) };
  res.json({ success: true, newConfig: config[placeId] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
