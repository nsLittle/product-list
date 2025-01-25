'use client';

import React, { useEffect } from 'react';
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

  const fetchProducts = async (page) => {
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

      if (page > 1) {
        queryParams.push(`page=${encodeURIComponent(page)}`);
      }

      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      const url = `http://localhost:8000/products${queryString}`;
       
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
    fetchProducts(currentPage);
  }, [selectedCategoryOption, selectedPriceOption, searchValue, currentPage]);

  const refreshFilters = () => {
    dispatch(setCategoryOption('default'));
    dispatch(setPriceOption('default'));
    dispatch(setSearchValue(''));
    router.push('/');
  };

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

    router.replace(browserUrl, undefined, { shallow: true });
  };

  const handlePageChange = async (currentPage) => {
    if (currentPage > 0 && currentPage <= totalPages) {
      updateUrl({ page: currentPage });
      await fetchProducts(currentPage);
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const lastPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
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
        <div className='stat-link-box'>
          <LastPage onClick={lastPage} disabled={currentPage <= 1} currentPage={currentPage} />
          <ProductStats items={items} />
          <NextPage onClick={nextPage} disabled={currentPage >= totalPages} currentPage={currentPage} />
        </div>
    </main>
  );
};