import React, { useState } from "react";
import "./Navbar.scss";
import Filter from "../filter/filter";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Dropdown from "./../dropdown/dropdown";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <nav>
      {/* Top Part */}
      <div className="top">
        <div className="info">
          <a href="/about">
            <span>About Us</span>
          </a>
          <a href="/contact">
            <span>Contact Us</span>
          </a>
        </div>
      </div>

      {/* Center Part */}
      <div className="center">
        <a className="logo" href="/">
          <img src="/assets/logo.png" alt="logo" />
        </a>
        
        {/* DropDown Menu */}
        <div className="menuBtn">
          <div className="categories">
            <RxHamburgerMenu className="img" onClick={handleMenu} />
          </div>
          {openMenu && <Dropdown />}
        </div>
        <span className="divider">|</span>
        <label htmlFor="name" className="label">
          Search Products:
        </label>
        <div className="search">
          <input
            type="text"
            name="search"
            placeholder="Search by part #"
            className="input"
          />
          <IoIosSearch className="searchIcon" />
        </div>
        <div className="right">
          <a className="signIn" href="/login">
            <img src="/assets/user.png" alt="user" />
            <span>Sign In</span>
          </a>
          <a className="cart" href="/">
            <img src="/assets/cart.png" alt="cart" />
            <span>Cart</span>
          </a>
        </div>
        <div className="menuIcon">
          <img
            src="/assets/menuIcon.png"
            alt="menu"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Products</a>
          <a href="/">Sign In</a>
          <a href="/">Cart</a>
          <a href="/">My Acount</a>
        </div>
      </div>

      {/* Botttom Filter */}
      <Filter />
    </nav>
  );
};

export default Navbar;
