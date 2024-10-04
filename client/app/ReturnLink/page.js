import React from "react";


export default function ReturnLink() {
  
  const handleClick = () => {
    window.location.reload();
  }

  return (
    <>
        <p className="return-link" onClick={handleClick}>Return to Product List</p>
    </>
  )
}