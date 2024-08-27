const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }
});

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
});

// Define virtual field for populating reviews
productSchema.virtual('reviews', {
  ref: 'Review', // Reference to the Review model
  localField: '_id', // Field in the Product schema
  foreignField: 'product', // Field in the Review schema
});

// Ensure virtuals are included when converting to JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Review = mongoose.model('Review', reviewSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Review };