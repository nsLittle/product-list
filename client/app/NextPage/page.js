import React from "react";
import Image from 'next/image';

export default function NextPage({ onClick, disabled }) {

  return (
    <>
      <div className="next-page-box">
      <a 
        className={`next-page-link ${disabled ? 'disabled' : ''}`} 
        onClick={!disabled ? onClick : null}
      >
        <Image
          className="next"
          src="/next.png"
          alt="next page">
        </Image>
      </a>
      </div>
    </>
  )
}