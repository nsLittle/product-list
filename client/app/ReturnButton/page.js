import React from "react";


export default function ReturnButton() {
  
  const handleClick = () => {
    window.location.reload();
  }

  return (
    <>
      <div className="return-box">
        <button className="return-button" onClick={handleClick}>Return to All Products List</button>
      </div>
    </>
  )
}