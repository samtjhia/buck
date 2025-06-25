const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("buck backend running");
});

//POST route
app.post("/recommend", (req, res) => {
    console.log("received form data:", req.body);

    res.json({
        message: "backend received your request",
        data: req.body,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
