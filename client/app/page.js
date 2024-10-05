'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { useDispatch, useSelector } from 'react-redux';
import  { useRouter } from 'next/navigation';
import { setCategoryOption, setPriceOption, setSearchValue, setProducts } from './redux/actions/productActions.js';
import SearchBar from './SearchBar/page.js';
import ProductsList from './ProductsList/page.js';
import './globals.css';
import DropDownCategory from './DropDownCategory/page.js';
import DropDownPrice from './DropDownPrice/page.js';
import ReturnButton from './ReturnButton/page.js';

export default function Home({ sortOption }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedCategoryOption = useSelector(state => state.products.selectedCategoryOption);
  const selectedPriceOption = useSelector(state => state.products.selectedPriceOption);
  const items = useSelector(state => state.products.items);
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
        const url = `http://localhost:8000/products${queryString}`;
       
        const response = await fetch(url);
        const data = await response.json();

        dispatch(setProducts({
          All_Products: data.All_Products,
          Products_By_Category_Alpha: data.Products_By_Category_Alpha,
          Products_By_Category_Alpha_Reverse: data.Products_By_Category_Alpha_Reverse,
          Products_By_Product_Alpha: data.Products_By_Product_Alpha,
          Products_By_Product_Alpha_Reverse: data.Products_By_Product_Alpha_Reverse,
          Queried_Products: data.Queried_Products,
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
    console.log('Redux selectedCategoryOptions: ', selectedCategoryOption);

    const query = {};

    if (selectedCategoryOption !== 'default') {
      query.category = selectedCategoryOption;
    }
    if (selectedPriceOption !== 'default') {
      query.price = selectedPriceOption;
    }
    if (searchValue) {
      query.product = searchValue;
    }

    router.push({
      pathname:  '/products',
      query: query,
    });

  }, [selectedCategoryOption, selectedPriceOption, searchValue,items, router]);

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
      setSearchValue(newValue);
      dispatch(setSearchValue(newValue));
      dispatch(setCategoryOption('default'));
      dispatch(setPriceOption('default'));
    };

  return (
    <Provider store={store}>
    <main>
        <div className='sort-menu'>
          <SearchBar onSearch={handleSearch} value={searchValue} />
          <DropDownCategory onCategoryChange={handleCategoryChange} selectedCategoryOption={selectedCategoryOption} />
          <DropDownPrice onPriceChange={handlePriceChange} selectedPriceOption={selectedPriceOption} />
        </div>
        <div>
          <ProductsList selectedCategoryOption={selectedCategoryOption} selectedPriceOption={selectedPriceOption} items={items} searchValue={searchValue}  />
        </div>
        <div>
          <ReturnButton />
        </div>
    </main>
    </Provider>
  );
}