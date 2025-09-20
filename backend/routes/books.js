// backend/routes/books.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.get("/books", controller.getBooks);
router.get("/books/:id", controller.getBookById);

module.exports = router;
