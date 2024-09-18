'use client';
import React from 'react';
import { useState } from 'react';
import '../globals.css';

export default function DropDownPrice({ onPriceChange }) {
  const [selectedPriceOption, setSelectedPriceOption] = useState('Sort by Price');

  const handlePriceChange = (e) => {
    const choice = e.target.value;
    console.log(choice);
    setSelectedPriceOption(choice);
  };

  return (
    <main>
      <select value={selectedPriceOption} onChange={handlePriceChange} className="drop-price">
        <option disabled>Sort by Price</option>
        <option value="lowest-to-highest">Price Low to High (0-10)</option>
        <option value="highest-to-lowest">Price High to Low (10-0)</option>
      </select>
    </main>
  )
}