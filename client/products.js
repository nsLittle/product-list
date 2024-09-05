'use client';
import { useEffect, useState } from 'react';
import './globals.css';

export default function ProductsPage(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products', error));
  }, []);

  return (
    <>
      <div>
        <ul>
          {products.map(product => (
            <li key={product}>{product}</li>
          ))}
        </ul>
      </div>
    </>
  );
}