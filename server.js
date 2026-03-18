const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/download", async (req, res) => {
  let url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  try {
    // ✅ Expand shortened TikTok link
    if (url.includes("vt.tiktok.com")) {
      const redirect = await axios.get(url, {
        maxRedirects: 5
      });
      url = redirect.request.res.responseUrl;
    }

    // ✅ Call API with FULL URL
    const response = await axios.get(
      `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`
    );

    res.json(response.data);

  } catch (err) {
    res.json({ error: "Failed to fetch video" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
