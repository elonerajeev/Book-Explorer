// backend/controllers/bookController.js
const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const { search, rating, price, stock } = req.query;

    const filter = {};

    if (search) {
      // use text search if indexed, else regex fallback
      filter.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    if (price) {
      filter.price = { $lte: Number(price) };
    }

    if (stock === "in-stock") filter.inStock = true;
    if (stock === "out-of-stock") filter.inStock = false;

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ title: 1 })
      .lean();

    // Mongoose toJSON transform will map _id -> id if using model docs,
    // but since we used .lean(), we need to map id manually:
    const transformed = books.map((b) => {
      b.id = b._id;
      delete b._id;
      delete b.__v;
      return b;
    });

    res.json({
      books: transformed,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("getBooks error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book.toJSON());
  } catch (err) {
    console.error("getBookById error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
