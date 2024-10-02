'use client';
import React from 'react';
import '../globals.css';

export default function DropDownCategory({ selectedCategoryOption, onCategoryChange }) {

  const handleChange = (e) => {
    const sortOption = e.target.value;
    onCategoryChange(sortOption);
  }

  return (
    <main>
      <select
        value={selectedCategoryOption}
        onChange={handleChange}
        className="drop-category"
      >
        <option value="default">Sort by Category</option>
        <option value="ascending-category">Category Ascending (A-Z)</option>
        <option value="descending-category">Category Descending (Z-A)</option>
        <option value="ascending-product">Product Ascending (A-Z)</option>
        <option value="descending-product">Product Descending (Z-A)</option>
      </select>
    </main>
  )
}