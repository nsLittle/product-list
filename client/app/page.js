'use client';
import React from 'react';
import ProductsList from './Products/page.js';
import './globals.css';

export default function Home() {

  return (
    <main>
        <header>
          <h1>Cool Products</h1>
        </header>
        <div>
          <ProductsList />
        </div>
    </main>
  );
}