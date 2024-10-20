const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { Product, Review } = require("../models/product");
const { clear } = require('console');

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
      let product;
      do {
        product = new Product({
          category: faker.commerce.department(),
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price()),
          image: faker.image.urlPicsumPhotos(),
        });
      } while (!product.category || !product.name || !product.price || !product.image);

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
      res.send("We're building a whole fake store!");
    } catch (error) {
      next(error);
    }
});

router.get("/products", async (req, res, next) => {
  try {
    const perPage = 9;
    const page = parseInt(req.query.page, 10) || 1;

    // QUERY FROM URL
    const category = req.query.category;
    const price = req.query.price;
    const product = req.query.product;

    let query = {
      name: { $ne: null },
      category: { $ne: null },
      price: { $ne: null },
      image: { $ne: null }
    };
    let sortOptions = {};

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (price === 'highest') {
      sortOptions.price = -1;
    } else if (price === 'lowest') {
      sortOptions.price = 1;
    }

    if (product) {
      query.name = { $regex: new RegExp(`^${product}$`, 'i') };
    }

    // RESPONSE FOR ALL PRODUCTS
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(perPage * (page - 1))
      .limit(perPage)

    const filteredProducts = products.filter(product => product.name && product.category && product.price && product.image);

    // RESPONSE FOR OTHER SORTS 
    const productSearched = await Product.findOne(query)

    const filteredProductSearched = productSearched && productSearched.name && productSearched.category && productSearched.price && productSearched.image ? productSearched : null;

    // const sortedCategoryAlpha = await Product.find({})
    //   .sort({ category: 1, name: 1 })
    //   .skip(perPage * (page - 1))
    //   .limit(perPage)
    
    // const filteredSortedCategoryAlpha = sortedCategoryAlpha.filter(product => product.name && product.category && product.price && product.image);

    // const sortedCategoryAlphaReverse = await Product.find({})
    // .sort({ category: -1, name: -1 })
    // .skip(perPage * (page - 1))
    // .limit(perPage)

    // const filteredSortedCategoryAlphaReverse = sortedCategoryAlphaReverse.filter(product => product.name && product.category && product.price && product.image);
    
    // const sortedProductAlpha = await Product.find({})
    //   .sort({ name: 1 })
    //   .skip(perPage * (page - 1))
    //   .limit(perPage)
        
    // const filteredSortedProductAlpha = sortedProductAlpha.filter(product => product.name && product.category && product.price && product.image);

    // const sortedProductAlphaReverse = await Product.find({})
    //   .sort({ name: -1 })
    //   .skip(perPage * (page -1))
    //   .limit(perPage)

    // const filteredSortedProductAlphaReverse = sortedProductAlphaReverse.filter(product => product.name &&  product.category && product.price && product.image);

    const sortedPriceLow = await Product.find({})
      .sort({ price: 1 })
      .skip(perPage * (page - 1))
      .limit(perPage)

    const filteredSortedPriceLow = sortedPriceLow.filter(product => product.name && product.category && product.price && product.image);

    const sortedPriceHigh = await Product.find({})
      .sort({ price: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)

    const filteredSortedPriceHigh = sortedPriceHigh.filter(product => product.name && product.category && product.price && product.image);

    const count = await Product.countDocuments(query);

    if (category || price || product) {
      return res.json({
        Queried_Products: filteredProducts,
        Total_Products: count,
        Total_Pages: Math.ceil(count / perPage),
        Current_Page: page,
      });
    }

    res.json({
      All_Products: filteredProducts,
      Queried_Products: filteredProducts,
      Total_Products: count,
      Total_Pages: Math.ceil(count / perPage),
      Current_Page: page
    });
  } catch (error) {
    next(error);
  }
});

router.get("/products/:product", async (req, res, next) => {

  try {
    const productName = req.params.product;

    const productDetails = await Product.find({ name: productName })

    res.json({ 'Product Details': productDetails });
    } catch (error) {
      next(error);
    }
  });

router.get("/products/:product/reviews", async (req, res, next) => {
  try {
    const productName = req.params.product;

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

router.post("/products", async (req, res, next) => {

  try {
    const productDetails = req.body;

    const newProduct = new Product(productDetails);
    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.post("/products/:product/reviews", async (req, res, next) => {});

router.delete("products/:product", async (req, res, next) => {});

router.delete("/reviews/:review", async (req, res, next) => {});

module.exports = router;