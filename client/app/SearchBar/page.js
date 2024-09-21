'use client';
import React from 'react';
import { useState } from 'react';
import '../globals.css';

export default function SearchBar({ onSearch, value }) {

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    onSearch(newValue);
    console.log(newValue);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      onSearch(value);
      console.log(value);
    }
  };

  return (
    <main>
      <input
        className="search-bar"
        placeholder="Search"
        value={value}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
    </main>
  )
}