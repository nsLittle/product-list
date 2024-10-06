import React from "react";


export default function ReturnButton() {
  
  const handleClick = () => {
    window.location.reload();
  }

  return (
    <>
      <div className="return-box">
        <a className="return-link" onClick={handleClick}>Return to Unsorted List</a>
      </div>
    </>
  )
}