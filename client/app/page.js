'use client';
import React from 'react';
import ProductsList from './Products/page.js';
import './globals.css';

export default function Home() {

  return (
    <main>
        <div>
          <ProductsList />
        </div>
    </main>
  );
}