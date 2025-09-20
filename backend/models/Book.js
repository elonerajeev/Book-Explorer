// backend/models/Book.js
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    detailUrl: { type: String, required: true, unique: true, index: true },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

// text index for search
BookSchema.index({ title: "text" });

// Transform output: add `id`, remove `_id` and `__v`
BookSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Book", BookSchema);
