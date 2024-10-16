'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../globals.css';

export default function ProductsStats({items, selectedCategoryOption, selectedPriceOption, searchValue }) {
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

  const getStatsToDisplay = () => {
    return {
      totalProducts: items.Total_Products,
      totalPages: items.Total_Pages,
      currentPage: items.Current_Page
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