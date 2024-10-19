'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../globals.css';

export default function ProductsList({items, selectedCategoryOption, selectedPriceOption, searchValue }) {
  const dispatch = useDispatch();

  const getProductsToDisplay = () => {
    if (!items) {
      return [];
    }

    if (searchValue || selectedPriceOption !== 'default' || selectedCategoryOption !== 'default') {
      return items.Queried_Products || [];
    };

    return items.All_Products || [];
  };

  const productsToDisplay = {
    products: getProductsToDisplay(),
  };

  const handleNextPage = () => {
    if (currentPage < totalPages){
      dispatch()
    }
  }

  return (
    <main>
      <div className="product-list">
        {Array.isArray(productsToDisplay.products) && productsToDisplay.products.length > 0 ? (
          productsToDisplay.products.map((item) =>(
            <div key={item.id} className='product-card'>
              <div className="product-details">
                <p className="product-category">Category: {item.category}</p>
                <p className="product-price">${item.price}</p>
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
};