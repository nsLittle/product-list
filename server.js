const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb://localhost/product-list');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log("first bump");

const mainRoutes = require("./routes/main");
app.use(mainRoutes);

console.log("second bump");

app.listen(3000, () => {
  console.log("Node.js listening on port " + 3000);
});