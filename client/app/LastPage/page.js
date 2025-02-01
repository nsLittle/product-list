"use client";

import React from "react";
import Image from 'next/image';

export default function LastPage({ onClick, disabled }) {

  return (
    <>
      <div className="last-page-box">
        <a className={`last-page-link ${disabled ? 'disabled' : ''}`} onClick={!disabled ? onClick : null}>
        <Image
          className="last"
          src="/last.png"
          alt="last page"
          width={200}
          height={100}
          >
        </Image>
        </a>
      </div>
    </>
  )
}