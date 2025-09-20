// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bookRoutes = require("./routes/books");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/book-explorer";

// connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// API routes
app.use("/api", bookRoutes);

// POST /api/refresh -> triggers scraper
app.post("/api/refresh", async (req, res) => {
  try {
    // require the scraper module (scraper should export runScraper)
    const scraper = require("../scraper/scraper");
    const result = await scraper.runScraper();
    res.json({ message: "Scrape finished", totalFound: result });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ error: "Failed to refresh data" });
  }
});

// simple health
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
