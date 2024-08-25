const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const Product = require("../models/product");

router.get("/generate-fake-data", async (req, res, next) => {
  console.log("third bump");

  try {
    const savePromises = [];
    
    for (let i = 0; i < 90; i++) {
      let product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()), // Convert price to number
        image: "https://via.placeholder.com/250?text=Product+Image"
      });

      savePromises.push(product.save());
    }

    await Promise.all(savePromises);

    res.status(200).send('Fake data generated successfully.');
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const perPage = 9;
    const page = req.query.page || 1;

    if (req.query.page) {
      const product = await Product.find({})
        .skip(perPage * page - perPage)
        .limit(perPage);
      const count = await Product.countDocuments();
      res.send(products);
    } else {
      const products = await Product.find();
      res.send(products);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;