'use client';
import React from 'react';
import { useState } from 'react';
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
        <option value="asecending-category">Alphabetical Ascending (A-Z)</option>
        <option value="descending-product">Alphabetical Descending (Z-A)</option>
      </select>
    </main>
  )
}