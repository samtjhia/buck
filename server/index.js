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
I'm a broke college student looking for food in ${location}.
Here are my preferences:
- Budget: $${budget}
- Mood: ${mood || "any"}
- Dietary Restrictions: ${dietary || "none"}
- Hunger Level: ${hunger || "normal"}
- Time: ${time || "now"}
- Other: ${other || "none"}

Please recommend a few restaurants that match these needs.

Respond in clear bullet points. For each restaurant:
- Give the name and cuisine.
- Summarize why it fits my preferences.
- Highlight any matching preferences.
- If any preference isn't clearly satisfied (especially dietary restrictions), mention it and wrap that warning in **double asterisks** for emphasis.

Keep the tone friendly, helpful, and concise.
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

    const aiResult = response.data;
    const businessIds = aiResult.entities[0]?.businesses?.map(b => b.id);

    if (!businessIds?.length) {
      return res.json({
        response: aiResult.response,
        entities: aiResult.entities,
        businesses: []
      });
    }

    const detailPromises = businessIds.map(id =>
      axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
        headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
      })
    );
    const details = await Promise.all(detailPromises);

    res.json({
      response: aiResult.response,
      entities: aiResult.entities,
      businesses: details.map(r => r.data),
    });

  } catch (err) {
    console.error("Yelp AI error:", err.response?.data || err.message);
    res.status(500).json({ error: "Yelp AI search failed" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`BUCK server running at http://localhost:${PORT}`);
});