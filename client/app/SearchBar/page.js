'use client';
import React, { useState } from 'react';
import '../globals.css';

export default function SearchBar({ onSearch }) {

  const [newValue, setNewValue] = useState('');

  const handleSearchChange = (e) => {
    setNewValue(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      onSearch(newValue);
    }
  };

  return (
    <main>
      <input
        className="search-bar"
        placeholder="Search"
        value={newValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
    </main>
  )
}