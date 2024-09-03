const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewer: String,
  reviewText: String,
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

// VIRTUAL FIELDN TO POPULATE REVIEWS
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

// INCLUDE VIRTUALS FOR JSON CONVERSIONS
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Review = mongoose.model('Review', reviewSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Review };