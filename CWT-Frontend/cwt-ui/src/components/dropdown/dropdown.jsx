import React from 'react'
import "./dropdown.scss"
export default function Dropdown() {
  return (
      <div className="list">
        <ul className="options">
            <li><a href='http://localhost:3001/orderHistory'>My Account</a></li>
            <li>About Us</li>
            <li>Contact</li>
            <li><a href='http://localhost:3001/profilePage'>Logout</a></li>
        </ul>
      </div>
  )
}

