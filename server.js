const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/download", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  try {
    const response = await axios.get(
      `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`
    );

    res.json(response.data);
  } catch (err) {
    res.json({ error: "Failed to fetch video" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
