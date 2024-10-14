'use client';

import React, { useEffect } from 'react';
import { Provider, shallowEqual } from 'react-redux';
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
  const searchValue = useSelector(state => state.products.searchValue);
  
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
        console.log('Url: ', url);
       
        const response = await fetch(url);
        const data = await response.json();

        console.log('Data: ',data);

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
    const queryParams = new URLSearchParams(window.location.search);
    const category = queryParams.get('category') || 'default';
    const price = queryParams.get('price') || 'default';
    const product = queryParams.get('product') || '';

    dispatch(setCategoryOption(category));
    dispatch(setPriceOption(price));
    dispatch(setSearchValue(product));
  }, [window.location.search, dispatch]);

  const updateUrl = (newQuery) => {
    const query = {
      category: selectedCategoryOption !== 'default' ? selectedCategoryOption : undefined,
      price: selectedPriceOption !== 'default' ? selectedPriceOption : undefined,
      product: searchValue || undefined,
      ...newQuery,
    };

    const filteredQuery = Object.fromEntries(Object.entries(query).filter(([_, v]) => v != null));
    
    const queryString = new URLSearchParams(filteredQuery).toString();
    const browserUrl = `?${queryString}`;
    console.log('Browser URL: ', `http://localhost:3000${browserUrl}`);

    router.replace(browserUrl, undefined, { shallow: true });
  };

    const handlePriceChange = (sortOption) => {
      dispatch(setPriceOption(sortOption));

      if (sortOption !== 'default') {
        dispatch(setCategoryOption('default'));
      }

      updateUrl({ price: sortOption });
    };

    const handleCategoryChange = (sortOption) => {
      dispatch(setCategoryOption(sortOption));

      if (sortOption !== 'default') {
        dispatch(setPriceOption('default'));
      }

      updateUrl({ category: sortOption });
    };
    
    const handleSearch = (newValue) => {
      dispatch(setSearchValue(newValue));
      dispatch(setCategoryOption('default'));
      dispatch(setPriceOption('default'));

      updateUrl({ product: newValue });
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