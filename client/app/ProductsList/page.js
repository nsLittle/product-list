'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import '../globals.css';

export default function ProductsList({items, selectedCategoryOption, selectedPriceOption }) {

  const { All_Products } = items;
  const { Sorted_By_Category } = selectedCategoryOption;

  return (
    <main>
      <div className="product-list">
        {All_Products.length > 0 ? (
          All_Products.map((item) => (
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