import React from "react";

export default function NextPage({ handlePageChange }) {
  

  return (
    <>
      <div className="next-page-box">
      <a 
        className={`next-page-link`} 
        onClick={handlePageChange}
      >
        Next Page
        </a>
      </div>
    </>
  )
}