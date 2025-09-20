// scraper/scraper.js

require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

// ✅ Define Book schema here for scraper's own mongoose connection
const BookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  inStock: Boolean,
  rating: Number,
  detailUrl: { type: String, unique: true },
  thumbnail: String,
});
const Book = mongoose.model("Book", BookSchema); // collection name = "books"

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/book-explorer";

// Map star-rating classes to numbers
const ratingMap = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5 };

async function connectDB() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Scraper connected to MongoDB");
}

async function parsePage(url) {
  const res = await axios.get(url);
  return cheerio.load(res.data);
}

async function runScraper() {
  await connectDB();

  const base = "https://books.toscrape.com/";
  let pageUrl = base;
  let total = 0;

  while (true) {
    console.log("🌐 Fetching", pageUrl);
    const $ = await parsePage(pageUrl);
    const items = $(".product_pod");

    for (let i = 0; i < items.length; i++) {
      const el = items.eq(i);

      const title = el.find("h3 a").attr("title")?.trim() || "No title";
      const detailHref = el.find("h3 a").attr("href") || "";
      const detailUrl = new URL(detailHref, pageUrl).href;

      const priceText = el.find(".price_color").text().trim().replace("£", "");
      const price = parseFloat(priceText) || 0;

      const availText = el.find(".availability").text().trim();
      const inStock = /In stock/i.test(availText);

      const ratingClass = (el.find("p.star-rating").attr("class") || "")
        .replace("star-rating", "")
        .trim()
        .split(/\s+/)[0];
      const rating = ratingMap[ratingClass] || 0;

      const imgSrc = el.find("img").attr("src") || "";
      const thumbnail = new URL(imgSrc, pageUrl).href;

      try {
        await Book.findOneAndUpdate(
          { detailUrl },
          { title, price, inStock, rating, detailUrl, thumbnail },
          { upsert: true, new: true }
        );
        total++;
      } catch (err) {
        console.warn("⚠️ Upsert error for", detailUrl, err.message);
      }
    }

    // check if there's a next page
    const nextHref = $(".next a").attr("href");
    if (!nextHref) break;
    pageUrl = new URL(nextHref, pageUrl).href;
  }

  console.log("✅ Scraping finished. Documents saved:", total);
  await mongoose.disconnect();
  return total;
}

// If run directly: `node scraper.js`
if (require.main === module) {
  runScraper()
    .then((total) => {
      console.log("📦 Total items processed:", total);
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Scraper error:", err);
      process.exit(1);
    });
}

module.exports = { runScraper };
