import React from "react";

export default function LastPage({ onClick, disabled }) {

  return (
    <>
      <div className="last-page-box">
        <a className={`last-page-link ${disabled ? 'disabled' : ''}`} onClick={!disabled ? onClick : null}>
        <img
          className="last"
          src="/last.png"
          alt="last page">
        </img>
        </a>
      </div>
    </>
  )
}