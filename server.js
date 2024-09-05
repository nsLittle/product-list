const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const cors = require('cors');

mongoose.connect('mongodb://localhost/product-list');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', index.html));
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

console.log("We're in the app...");

const mainRoutes = require("./routes/main");
app.use(mainRoutes);

console.log("The app is routing us to /main");

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});