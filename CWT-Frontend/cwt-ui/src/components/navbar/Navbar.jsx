import React from "react";
import "./Navbar.scss";
import Filter from "../filter/filter";
import Categories from "../categories/categories";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
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
          <span>C.W.T</span>
        </a>
        <Categories />
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
      </div>

      {/* Botttom Filter */}
      <Filter />
    </nav>
  );
};

export default Navbar;
