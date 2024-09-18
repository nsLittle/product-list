// 'use client';
// import React from 'react';
// import { useState } from 'react';
// import '../globals.css';

// export default function SearchBar() {
//   const [search, setSearch] = useState();

//   const handleSearchChange = (e) => {
//     console.log(e.target.value);
//     setSearch(e.target.value);
//   };

// return (
//   <main>
//     <input className="search-bar" placeholder="Search" onChange={handleSearchChange} />
//   </main>
// )
// }

'use client';
import React from 'react';
import { useState } from 'react';
import '../globals.css';

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setSearch(value);
    onSearch(value);
    if (value === '') {
      onSearch('');
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  }
  return (
    <main>
      <input
        className="search-bar"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
    </main>
  )
};