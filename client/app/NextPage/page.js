import React from "react";

export default function NextPage({ onClick, disabled }) {

  return (
    <>
      <div className="next-page-box">
      <a 
        className={`next-page-link ${disabled ? 'disabled' : ''}`} 
        onClick={!disabled ? onClick : null}
      >
        Next Page
        </a>
      </div>
    </>
  )
}