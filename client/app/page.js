'use client';

import React, { useEffect } from 'react';
import store from './redux/store.js';
import { useDispatch, useSelector } from 'react-redux';
import  { useRouter } from 'next/navigation';
import { setCategoryOption, setPriceOption, setSearchValue, setProducts, resetFilters } from './redux/actions/productActions.js';
import SearchBar from './SearchBar/page.js';
import ProductsList from './ProductsList/page.js';
import './globals.css';
import DropDownCategory from './DropDownCategory/page.js';
import DropDownPrice from './DropDownPrice/page.js';
import ReturnButton from './ReturnButton/page.js';
import ProductStats from './ProductStats/page.js';
import LastPage from './LastPage/page.js';
import NextPage from './NextPage/page.js';

export default function Home({ sortOption }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector(state => state.products.items);
  const selectedCategoryOption = useSelector(state => state.products.selectedCategoryOption);
  const selectedPriceOption = useSelector(state => state.products.selectedPriceOption);
  const searchValue = useSelector(state => state.products.searchValue);
  const currentPage = useSelector(state => state.products.items.Current_Page);
  const totalPages = useSelector(state => state.products.items.Total_Pages);

  console.log('Items: ', items);
  console.log('Current Page: ', currentPage);
  console.log('Total Pages: ', totalPages);

  const fetchProducts = async (page = currentPage) => {
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

      if (currentPage) {
        queryParams.push(`page=${encodeURIComponent(currentPage)}`);
      }

      queryParams.push(`page=${page}`);

      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      const url = `http://localhost:8000/products${queryString}`;
      console.log('Url: ', url);
       
      const response = await fetch(url);
      const data = await response.json();
        
      dispatch(setProducts({
        All_Products: data.All_Products,
        Queried_Products: data.Queried_Products,
        Total_Products: data.Total_Products,
        Total_Pages: data.Total_Pages,
        Current_Page: data.Current_Page,
      }))
    } catch (error) {
      console.error('Error fetching complete product listing:',error);
    }
  };

  useEffect(() => {

    fetchProducts();
  }, [selectedCategoryOption, selectedPriceOption, searchValue, currentPage, router, dispatch]);

  const refreshFilters = () => {
    dispatch(setCategoryOption('default'));
    dispatch(setPriceOption('default'));
    dispatch(setSearchValue(''));
    router.push('/');
  };

  const nextPage = async () => {
    console.log('Current Page: ', currentPage); 

    if (currentPage < totalPages) {
      const newPage = currentPage + 1;

      // dispatch(setProducts({ ...items, Current_Page: newPage }));
      await handlePageChange(newPage);
      // updateUrl({ page: newPage });
    }
  };

  const lastPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      dispatch(setProducts({ ...items, Current_Page: newPage }));
      updateUrl({ page: newPage });
      fetchProductsWithNewPage(newPage);
    }
  }

  // const fetchProductsWithNewPage = async (newPage) => {
  //   try {
  //       const queryParams = [];

  //       if (selectedCategoryOption !== 'default') {
  //         queryParams.push(`category=${encodeURIComponent(selectedCategoryOption)}`);
  //       }

  //       if (selectedPriceOption !== 'default') {
  //         queryParams.push(`price=${selectedPriceOption}`);
  //       }

  //       if (searchValue) {
  //         queryParams.push(`product=${encodeURIComponent(searchValue)}`);
  //       }

  //       queryParams.push(`page=${newPage}`);

  //       const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  //       const url = `http://localhost:8000/products${queryString}`;
  //       console.log('Url: ', url);
       
  //       const response = await fetch(url);
  //       const data = await response.json();
        
  //       dispatch(setProducts({
  //         All_Products: data.All_Products,
  //         Products_By_Category_Alpha: data.Products_By_Category_Alpha,
  //         Products_By_Category_Alpha_Reverse: data.Products_By_Category_Alpha_Reverse,
  //         Products_By_Product_Alpha: data.Products_By_Product_Alpha,
  //         Products_By_Product_Alpha_Reverse: data.Products_By_Product_Alpha_Reverse,
  //         Queried_Products: data.Queried_Products,
  //         Total_Products: data.Total_Products,
  //         Total_Pages: data.Total_Pages,
  //         Current_Page: newPage,
  //       }))
  //   } catch (error) {
  //   console.error('Error fetching complete product listing:', error);
  //   }
  // };

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

  const handlePageChange = async (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setProducts({ ...items, Current_Page: newPage }))
      updateUrl({ page: newPage });
      await fetchProducts(newPage);
    }
  }

   const handlePriceChange = (sortOption) => {
    dispatch(setPriceOption(sortOption));
    updateUrl({ price: sortOption !== 'default' ? sortOption : undefined });
  };

  const handleCategoryChange = (sortOption) => {
    dispatch(setCategoryOption(sortOption));
    updateUrl({ category: sortOption !== 'default' ? sortOption : undefined });
  };

  const handleSearch = (newValue) => {
    dispatch(setSearchValue(newValue));
    dispatch(setCategoryOption('default'));
    dispatch(setPriceOption('default'));
    updateUrl({ product: newValue });
  };

  return (
    <main>
        <div className='sort-menu'>
          <SearchBar onSearch={handleSearch} value={searchValue} />
          <DropDownCategory onCategoryChange={handleCategoryChange} selectedCategoryOption={selectedCategoryOption} />
          <DropDownPrice onPriceChange={handlePriceChange} selectedPriceOption={selectedPriceOption} />
        </div>
        <div>
          <ReturnButton refreshFilters={refreshFilters} />
        </div>
        <div>
          <ProductsList selectedCategoryOption={selectedCategoryOption} selectedPriceOption={selectedPriceOption} items={items} searchValue={searchValue} currentPage={currentPage} />
        </div>
        <div>
          <LastPage onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} currentPage={currentPage} />
          <ProductStats items={items} />
          <NextPage onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} currentPage={currentPage} />
        </div>
    </main>
  );
};