import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Cool Products",
  description: "Created by nsLittle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> */}
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Link className="routes" href="/products">
          <p className="return-link">Return to Product List</p>
        </Link>
      </body>
    </html>
  );
}
