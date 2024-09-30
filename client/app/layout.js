'use client';
import Link from "next/link";
import { Provider } from 'react-redux';
import store from './redux/store';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> */}
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Provider store={store}>
          {children}
          <Link className="routes" href="/products">
            <p className="return-link">Return to Product List</p>
          </Link>
        </Provider>
      </body>
    </html>
  );
}
