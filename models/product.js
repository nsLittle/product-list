const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: 
})

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model("Product", ProductSchema);