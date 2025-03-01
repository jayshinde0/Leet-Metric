import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Allow frontend requests
const corsOptions = {
    origin: "http://127.0.0.1:5500", // Change if needed
    methods: "POST",
    allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/leetcode", async (req, res) => {
    try {
        const response = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from LeetCode" });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`CORS Proxy running on http://localhost:${PORT}`));
