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
        <div className='sub-title'>
          <h2>List of Cool Stuff</h2>
        </div>

        <div>
          <ul className="product-list">
            {products.All_Products.map(product => (
              <li key={product._id} className="product-card">
                <div className='product-details'>
                  <div className="product-category">Category: <span style={{ fontWeight: 'bold'}}>{product.category}</span></div>
                  <div className="product-price">{product.price}</div>
                </div>
                <img src={product.image} alt={product.name} className="image-card" />
                <div className="product-name">{product.name}</div>
              </li>
            ))}
          </ul>
          <div>
            <p>Total Products: {products.Total_Products}</p>
          </div>

        </div>
    </main>
  );
}