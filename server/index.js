require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("buck backend running");
});

// Yelp AI route
app.post("/recommend", async (req, res) => {
  const { location, budget, mood, dietary, hunger, other, time } = req.body;

  const query = `
    I'm a broke college student in ${location}.
    Budget: $${budget}.
    Mood: ${mood || "any"}.
    Dietary: ${dietary || "none"}.
    Hunger: ${hunger || "normal"}.
    Extra: ${other || "none"}.
    Time: ${time || "now"}.
    Recommend restaurants that match.
  `.trim();

  try {
    const response = await axios.post(
      "https://api.yelp.com/ai/chat/v2",
      {
        query,
        user_context: {
          locale: "en_US"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Yelp AI response:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Yelp AI error:", err.response?.data || err.message);
    res.status(500).json({ error: "Yelp AI search failed" });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`BUCK server running at http://localhost:${PORT}`);
});