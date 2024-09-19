'use client';
import React from 'react';
import '../globals.css';

export default function ProductsList({items, selectedCategoryOption, selectedPriceOption }) {
console.log('Items received: ', items);
console.log('Selected Category: ', selectedCategoryOption);
  const { All_Products, Queried_Products } = items;
  const productsToDisplay = (selectedCategoryOption !== 'default' || selectedPriceOption !== 'default')
    ? (Queried_Products || [])
    : (All_Products || []);

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