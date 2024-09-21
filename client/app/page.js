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
    Products_By_Category_Alpha: [],
    Queried_Products: [],
    Total_Products: 0,
    Total_Pages: 0,
    Current_Page: 0,
  });
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = [];

        if (selectedCategoryOption !== 'default') {
          queryParams.push(`category=${encodeURIComponent(selectedCategoryOption)}`);
        }

        if (selectedPriceOption !== 'default') {
          queryParams.push(`price=${selectedPriceOption}`);
        }

        if (searchValue) {
          queryParams.push(`product=${encodeURIComponent(searchValue)}`);
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        console.log(queryString);
        const url = `http://localhost:8000/products${queryString}`;
        console.log(url);
       
        const response = await fetch(url);
        const data = await response.json();
        setItems({
          All_Products: queryParams.length === 0 ? (data.All_Products || []) : (items.All_Products || []),

          Products_By_Category_Alpha: queryParams.length === 0 ? (data.Products_By_Category_Alpha || []) : (items.Products_By_Category_Alpha || []),

          Products_By_Category_Alpha_Reverse: queryParams.length === 0 ? (data.Products_By_Category_Alpha_Reverse || []) : (items.Products_By_Category_Alpha_Reverse || []),

          Products_By_Product_Alpha: queryParams.length === 0 ? (data.Products_By_Product_Alpha || []) : (items.Products_By_Product_Alpha || []),

          Products_By_Product_Alpha_Reverse: queryParams.length === 0 ? (data.Products_By_Product_Alpha_Reverse || []) : (items.Products_By_Product_Alpha_Reverse || []),

          Queried_Products: queryParams.length > 0 ? (data.Queried_Products || []) : [],
          Total_Products: data.Total_Products|| 0,
          Total_Pages: data.Total_Pages || 0,
          Current_Page: data.Current_Page || 0,
        });
        console.log(data);
      } catch (error) {
        console.error('Error fetching complete product listing:', error);
      }
    };
    fetchProducts();
  }, [selectedCategoryOption, selectedPriceOption, searchValue]);

    const handlePriceChange = (sortOption) => {
      console.log("Price option changed to: ", sortOption);
      setSelectedPriceOption(sortOption);
      if (sortOption !== 'default') {
        setSelectedCategoryOption('default');
      }
    };

    const handleCategoryChange = (sortOption) => {
      setSelectedCategoryOption(sortOption);
      if (sortOption !== 'default') {
        setSelectedPriceOption('default');
      }
    };
    
    const handleSearch = (newValue) => {
      console.log('Search value: ', newValue);
      setSearchValue(newValue);
      setSelectedCategoryOption('default');
      setSelectedPriceOption('default');
    };

  return (
    <main>
        <div className='sort-menu'>
          <SearchBar onSearch={handleSearch} value={searchValue} />
          <DropDownCategory onCategoryChange={handleCategoryChange} selectedCategoryOption={selectedCategoryOption} />
          <DropDownPrice onPriceChange={handlePriceChange} selectedPriceOption={selectedPriceOption} />
        </div>
        <div>
          <ProductsList selectedCategoryOption={selectedCategoryOption} selectedPriceOption={selectedPriceOption} items={items} searchValue={searchValue}  />
        </div>
    </main>
  );
}