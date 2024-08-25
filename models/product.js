const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: String,
  text: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  }
});

const productSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
});

const Review = mongoose.model('review', reviewSchema);
const Product = mongoose.model('product', productSchema);

module.exports = mongoose.model("Product", productSchema);