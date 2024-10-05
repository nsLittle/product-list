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
        <option value="Automotive">Automotive</option>
        <option value="Baby">Baby</option>
        <option value="Beauty">Beauty</option>
        <option value="Books">Books</option>
        <option value="Clothing">Clothing</option>
        <option value="Computers">Computers</option>
        <option value="Electronics">Electronics</option>
        <option value="Games">Games</option>
        <option value="Garden">Garden</option>
        <option value="Health">Health</option>
        <option value="Home">Home</option>
        <option value="Industrial">Industrial</option>
        <option value="Music">Music</option>
        <option value="Outdoors">Outdoors</option>
        <option value="Shoes">Shoes</option>
        <option value="Sports">Sports</option>
        <option value="Tools">Tools</option>
        <option value="Toys">Toys</option>
      </select>
    </main>
  )
}