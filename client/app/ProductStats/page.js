'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import '../globals.css';

export default function ProductsStats({items, selectedCategoryOption, selectedPriceOption, searchValue }) {
  const dispatch = useDispatch();

  const getProductsToDisplay = () => {
    if (!items) {
      return [];
    }
  
    if (searchValue || selectedPriceOption !== 'default' || selectedCategoryOption !== 'default') {
      return items?.Queried_Products || [];
    }
  
    return items?.All_Products || [];
  };  

  const getStatsToDisplay = () => {
    const { Total_Products = 0, Total_Pages = 0, Current_Page = 1 } = items || {};
    return {
      totalProducts: Total_Products,
      totalPages: Total_Pages,
      currentPage: Current_Page
    };
  };
  
  

  const productsToDisplay = {
    products: getProductsToDisplay(),
    stats: getStatsToDisplay()
  };

  return (
    <main>
      <div className="product-stats-box">
        <div className="product-stats">
          <p>Total Products: {productsToDisplay.stats.totalProducts}</p>
          <p>Total Pages: {productsToDisplay.stats.totalPages}</p>
          <p>Current Page: {productsToDisplay.stats.currentPage}</p>
        </div>
      </div>
    </main>
  );
};