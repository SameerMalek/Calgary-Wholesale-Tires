import React from 'react'
import "./dropdown.scss"
import { Link } from 'react-router-dom'
export default function Dropdown() {
  return (
      <div className="list">
        <ul className="options">
            <li>My Account</li>
            <li>About Us</li>
            <li>Contact</li>
            <li><a href='http://localhost:3000/profilePage'>Logout</a></li>
        </ul>
      </div>
  )
}

