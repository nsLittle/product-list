'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryOption, setPriceOption, setSearchValue, setProducts } from './redux/actions/productActions.js';
import SearchBar from './SearchBar/page.js';
import ProductsList from './ProductsList/page.js';
import './globals.css';
import DropDownCategory from './DropDownCategory/page.js';
import DropDownPrice from './DropDownPrice/page.js';

export default function Home({ sortOption }) {
  const dispatch = useDispatch();

  const selectedCategoryOption = useSelector(state => state.products.selectedCategoryOption);
  const selectedPriceOption = useSelector(state => state.products.selectedPriceOption);
  const items = useSelector(state => state.products.items);
  const searchValue = useSelector(state => state.products.searchValue);
  
  useEffect(() => {
    console.log('Redux items: ', items)
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

        dispatch(setProducts({
          All_Products: queryParams.length === 0 ? data.All_Products : items.All_Products,
          Queried_Products: queryParams.length > 0 ? data.Queried_Products : [],
          Total_Products: data.Total_Products,
          Total_Pages: data.Total_Pages,
          Current_Page: data.Current_Page,
        }))
      } catch (error) {
        console.error('Error fetching complete product listing:', error);
      }
    };
    fetchProducts();
  }, [selectedCategoryOption, selectedPriceOption, searchValue, dispatch]);

  useEffect(() => {
    console.log('Redux Items: ', items);
  }, [items]);

    const handlePriceChange = (sortOption) => {
      dispatch(setPriceOption(sortOption));
      if (sortOption !== 'default') {
        dispatch(setCategoryOption('default'));
      }
    };

    const handleCategoryChange = (sortOption) => {
      dispatch(setCategoryOption(sortOption));
      if (sortOption !== 'default') {
        dispatch(setPriceOption('default'));
      }
    };
    
    const handleSearch = (newValue) => {
      dispatch(setSearchValue(newValue));
      dispatch(setCategoryOption('default'));
      dispatch(setPriceOption('default'));
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