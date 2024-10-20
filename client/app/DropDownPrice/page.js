'use client';
import React from 'react';
import '../globals.css';

export default function DropDownPrice({ onPriceChange, selectedPriceOption }) {

  const handlePriceChange = (e) => {
    const sortOption = e.target.value;
    onPriceChange(sortOption);
  };

  return (
    <main>
      <select
        value={selectedPriceOption}
        onChange={handlePriceChange}
        className="drop-price"
      >
        <option value="default">Sort by Price</option>
        <option value="lowest">Price Low to High (0-10)</option>
        <option value="highest">Price High to Low (10-0)</option>
      </select>
    </main>
  )
}