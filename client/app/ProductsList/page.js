'use client';
import React from 'react';
import '../globals.css';

export default function ProductsList({items, selectedCategoryOption, selectedPriceOption, searchValue }) {
  console.log('Items received: ', items);
  console.log('Selected Category: ', selectedCategoryOption);

  const getProductsToDisplay = () => {
    if (!items) {
      console.log('Items is not found or something');
      return [];
    }

    if (searchValue) {
      console.log('Search Value: ', searchValue)
      return items.Queried_Products || [];
    }

    if (selectedPriceOption !== 'default') {
      return items.Queried_Products || [];
    }

    if (selectedCategoryOption !== 'default') {
      switch (selectedCategoryOption) {
        case 'ascending-category':
          return items.Products_By_Category_Alpha;
        case 'descending-category':
          return items.Products_By_Category_Alpha_Reverse || [];
        case 'ascending-products':
          return items.Products_By_Product_Alpha || [];
        case 'descending-products':
          return items.Products_By_Product_Alpha_Reverse || [];
        default:
          console.log('Selected Category Option: ', selectedCategoryOption);
          console.log(items.All_Products);
          return items.All_Products || [];
      }
    }
    return items.All_Products || [];
  }

  const productsToDisplay = getProductsToDisplay();
  console.log(productsToDisplay)

  return (
    <main>
      <div className="product-list">
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((item) => (
            <div key={item.id} className='product-card'>
              <div className="product-details">
                <p className="product-category">Category: {item.category}</p>
                <p className="product-price">{item.price}</p>
              </div>
              <img className="image-card" src={item.image} alt={item.name} />
              <h2 className="product-name">{item.name}</h2>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </main>
  );
}