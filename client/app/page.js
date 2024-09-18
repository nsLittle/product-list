'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/page.js';
import ProductsList from './ProductsList/page.js';
import './globals.css';
import DropDownCategory from './DropDownCategory/page.js';
import DropDownPrice from './DropDownPrice/page.js';

export default function Home({ sortOption }) {
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('default');
  const [selectedPriceOption, setSelectedPriceOption] = useState('default');
  const [items, setItems] = useState({
    All_Products: [],
    Total_Products: 0,
    Total_Pages: 0,
    Current_Page: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      console.log(selectedPriceOption);
      try {
        const queryParams = [];

        if (selectedCategoryOption !== 'default') {
          queryParams.push(`category=${encodeU(selectedCategoryOption)}`);
        }

        if (selectedPriceOption !== 'default') {
          queryParams.push(`price=${selectedPriceOption}`);
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        console.log(queryString);
        const url = `http://localhost:8000/products${queryString}`;
        console.log(url);
       
        const response = await fetch(url);
        const data = await response.json();
        setItems({
          All_Products: data.All_Products || [],
          Total_Products: data.Total_Products || 0,
          Total_Pages: data.Total_Pages || 0,
          Current_Page: data.Current_Page || 0,
        });
        console.log(data);
      } catch (error) {
        console.error('Error fetching complete product listing:', error);
      }
    };
    fetchProducts();
  }, [selectedCategoryOption, selectedPriceOption]);


    const handlePriceChange = (sortOption) => {
      console.log("Price option changed to: ", sortOption);
      setSelectedPriceOption(sortOption);
    };

    const handleCategoryChange = (sortOption) => {
    setSelectedCategoryOption(sortOption);
    };

    
  return (
    <main>
        <div className='sort-menu'>
          <SearchBar />
          <DropDownCategory onCategoryChange={handleCategoryChange} />
          <DropDownPrice onPriceChange={handlePriceChange} selectedPriceOption={selectedPriceOption} />
        </div>
        <div>
          <ProductsList selectedCategoryOption={selectedCategoryOption} setSelectedCategoryOption={setSelectedCategoryOption} selectedPriceOption={selectedPriceOption} setSelectedPriceOption={setSelectedPriceOption} items={items}  />
        </div>
    </main>
  );
}