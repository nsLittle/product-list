'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import '../globals.css';

export default function ProductsList() {
  const [products, setProducts] = useState({
    All_Products: [],
    Total_Products: 0,
    Total_Pages: 0,
    Current_Page: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products');

        if (!response.ok) {
          throw new Error('Network response not okay');
        }
        const data = await response.json();
        console.log(data);

        setProducts({
          All_Products: data.All_Products,
          Total_Products: data.Total_Products,
          Total_Pages: data.Total_Pages,
          Current_Page: data.Current_Page,
        });
      } catch (error) {
        console.error('Error fetching product list');
        setError(error.message);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <main>
      <div className="product-list">
        {products.All_Products.map((product) => 
          (<div key={product.id} className="product-card">
            <div  className="product-details">
              <p className="product-category">Category: {product.category}</p>
              <p>${product.price}</p>
            </div>
            <img src={product.image} alt={product.name} className="product-image" />
            <p>{product.name}</p>
          </div>)
        )}
      </div>
    </main>
  );
}