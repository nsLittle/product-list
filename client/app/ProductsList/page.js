'use client';
import React from 'react';
import '../globals.css';

export default function ProductsList({items, selectedCategoryOption, selectedPriceOption, searchValue }) {

  const getProductsToDisplay = () => {
    if (!items) {
      return [];
    }

    if (searchValue) {
      return items.Queried_Products || [];
    }

    if (selectedPriceOption !== 'default') {
      return items.Queried_Products || [];
    }

    if (selectedCategoryOption !== 'default') {
      return items.Queried_Products || [];
    }

    return items.All_Products || [];
  }

  const productsToDisplay = getProductsToDisplay();

  return (
    <main>
      <div className="product-list">
        {Array.isArray(productsToDisplay) && productsToDisplay.length > 0 ? (
          productsToDisplay.map((item) =>(
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