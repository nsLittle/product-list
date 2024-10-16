import React from "react";

export default function ReturnButton({ refreshFilters }) {
  
  const handleClick = () => {
    refreshFilters();
  }

  return (
    <>
      <div className="return-box">
        <a className="return-link" onClick={handleClick}>Original List</a>
      </div>
    </>
  )
}