'use client';
import React from 'react';
import '../globals.css';

export default function DropDownCategory({ selectedCategoryOption, setSelectedCategoryOption }) {

  const handleChange = (e) => {
    const choice = e.target.value;
    console.log(choice);
    setSelectedCategoryOption = choice;
  };

  return (
    <main>
      <select value={selectedCategoryOption} onChange={handleChange} className="drop-category">
        <option default>Sort by Category</option>
        <option value="asecending-category">Ascending by Category (A-Z)</option>
        <option value="descending-category">Descending by Category (Z-A)</option>
        <option value="asecending-products">Ascending by Product (A-Z)</option>
        <option value="asecending-category">Descending by Product (Z-A)</option>
      </select>
    </main>
  )
}