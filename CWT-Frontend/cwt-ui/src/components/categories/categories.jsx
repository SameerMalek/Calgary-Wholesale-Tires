import React from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import "./categories.scss";

export default function Categories() {
  return (
    <div className='menuBtn'>
        <a href="/" className='categories'>
        <RxHamburgerMenu className='img' />
        </a>
    </div>
  )
}
