import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Cool Products",
  description: "Created by nsLittle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Link className="routes" href="/products">
          <p className="return-link">Return to Product List</p>
        </Link>
      </body>
    </html>
  );
}
