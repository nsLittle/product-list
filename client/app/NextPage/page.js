import React from "react";

export default function NextPage({ onClick, disabled }) {
  

  return (
    <>
      <div className="next-page-box">
        <a className="next-page-link" onClick={onClick} disabled={disabled}>Next Page</a>
      </div>
    </>
  )
}