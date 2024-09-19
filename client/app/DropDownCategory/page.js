'use client';
import React from 'react';
import '../globals.css';

export default function DropDownCategory({ selectedCategoryOption, onCategoryChange }) {

  const handleChange = (e) => {
    const sortOption = e.target.value;
    console.log(sortOption);
    onCategoryChange(sortOption);
  };

  return (
    <main>
      <select
        value={selectedCategoryOption}
        onChange={handleChange}
        className="drop-category"
      >
        <option value="default">Sort by Category</option>
        <option value="ascending-category">Ascending by Category (A-Z)</option>
        <option value="descending-category">Descending by Category (Z-A)</option>
        <option value="ascending-products">Ascending by Product (A-Z)</option>
        <option value="descending-products">Descending by Product (Z-A)</option>
      </select>
    </main>
  )
}