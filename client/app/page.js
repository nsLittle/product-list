// 'use client';
// import React from 'react';
// import ProductsList from './Products/page.js';
// import './globals.css';

// export default function Home() {

//   return (
//     <main>
//         <div>
//           <ProductsList />
//         </div>
//     </main>
//   );
// }

'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/page.js';
import ProductsList from './ProductsList/page.js';
import './globals.css';
import DropDownCategory from './DropDownCategory/page.js';
import DropDownPrice from './DropDownPrice/page.js';

export default function Home() {
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('Sort by Category');
  const [selectedPriceOption, setSelectedPriceOption] = useState('Sort by Price');
  const [items, setItems] = useState({
    All_Products: [],
    Total_Products: 0,
    Total_Pages: 0,
    Current_Page: 0,
  });
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = [];

        if (selectedCategoryOption !== 'Sort by Category') {
          queryParams.push(`category=${encodeURIComponent(selectedCategoryOption)}`);
        }

        if (selectedPriceOption !== 'Sort by Price') {
          const priceSort = selectedPriceOption === 'lowest-to-highest' ? 'lowest' : 'highest';
          queryParams.push(`price=${priceSort}`);
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        console.log(queryString);
        const url = `http://localhost:8000/products${queryString}`;
       
        const response = await fetch(url);
        const data = await response.json();
        setItems({
          All_Products: data.All_Products || [],
          Total_Products: data.Total_Products || 0,
          Total_Pages: data.Total_Pages || 0,
          Current_Page: data.Current_Page || 0,
        });
        setInitialFetchDone(true);

      } catch (error) {
        console.error('Error fetching complete product listing:', error);
      }
    };
    if (!initialFetchDone) {
      fetchProducts();
    }
  }, [selectedCategoryOption, selectedPriceOption]);


    const handlePriceChange = (sortOption) => {
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
          <DropDownPrice onPriceChange={handlePriceChange} />
        </div>
        <div>
          <ProductsList selectedCategoryOption={selectedCategoryOption} setSelectedCategoryOption={setSelectedCategoryOption} selectedPriceOption={selectedPriceOption} setSelectedPriceOption={setSelectedPriceOption} items={items}  />
        </div>
    </main>
  );
}