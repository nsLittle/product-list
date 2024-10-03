import React from "react";
import Link from "next/link";


export default function ReturnLink() {
  
  return (
  <Link className="routes" href="/?reset=true">
  <p className="return-link">Return to Product List</p>
  </Link>
  )
}