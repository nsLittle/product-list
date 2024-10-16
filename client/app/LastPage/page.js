import React from "react";

export default function LastPage({ onClick, disabled }) {

  return (
    <>
      <div className="last-page-box">
        <a className="last-page-link" onClick={onClick} disabled={disabled}>Last Page</a>
      </div>
    </>
  )
}