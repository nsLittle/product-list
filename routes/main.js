const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { Product, Review } = require("../models/product");

router.get("/generate-fake-data", async (req, res, next) => {
  console.log("App is giving us fake data...");

  try {
    // CLEAN DB ON START
    async function dropDatabase() {
      try {
        await mongoose.connection.dropDatabase();
        console.log('Database dropped');
      } catch (error) {
        console.error('Error dropping database:', error);
      }
    };
    await dropDatabase();
    console.log('DB drop complete');
  
    const savePromises= [];
    
    for (let i = 0; i < 90; i++) {
      let product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.urlPicsumPhotos(),
      });
      const savedProduct = await product.save();

      for (let i = 0; i < 4; i++) {
        let review = new Review({
          userName: faker.person.firstName(),
          text: faker.lorem.paragraphs(),
          product: savedProduct._id,
        });
      savePromises.push(review.save());
      }
    };  
    
    await Promise.all(savePromises);

    res.status(200).send('Fake data generated successfully.');
  } catch (err) {
    next(err);
  }
});

router.get("/", (req, res, next) => {
    try {
      res.send("We're building something here, but I don't know what yet...");
    } catch (error) {
      next(error);
    }
});

// some other sorting
router.get("/products", async (req, res, next) => {
  try {
    const perPage = 5;
    const page = parseInt(req.query.page, 10) || 1;

    const products = await Product.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
    
    // const category = await Product.find({ category: "Automotive" })
    //  .sory({ name:1 })
    //  .skip(perPage * page - perPage)
    //  .limit(perPage)

    const sortedAlpha = await Product.find({})
      .sort({ category: 1, name: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
        
    const sortedPriceLow = await Product.find({})
      .sort({ price: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage)

    const sortedPriceHigh = await Product.find({})
      .sort({ price: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
    
    const count = await Product.countDocuments();

    res.json({
      All_Products: products,
      Products_By_Category: sortedAlpha,
      Sorted_By_Price: sortedPriceLow,
      Total_Products: count,
      Total_Pages: Math.ceil(count / perPage),
      Current_Page: page
    });
  } catch (error) {
    next(error);
  }
});

router.get("/products/:product", async (req, res, next) => {
  console.log('Product Detail...');

  try {
    const producNamet = req.params.product;
    console.log(productName);

    const productWithReviews = await Product.find({ name: producName })
      .populate('reviews');

      res.json({ 'Product Details': products });


    } catch (error) {
      next(error);
    }
  });

// limit to 4 reviews at a time
router.get("/products/:product/reviews", async (req, res, next) => {
  console.log('Product Reviews...');

  try {
    const productName = req.params.product;
    console.log(productName);

    const productWithReviews = await Product.findOne({ name: productName })
      .populate({
        path: 'reviews',
        options: {
          limit: 4,
        }
      });

      res.json({ 
        'Product Reviews': productWithReviews 
      });
  } catch (error) {
    next(error);
  }
});

router.post("/products", async (req, res, next) => {});

router.post("/products/:product/reviews", async (req, res, next) => {});

router.delete("products/:product", async (req, res, next) => {});

router.delete("/reviews/:review", async (req, res, next) => {});

module.exports = router;