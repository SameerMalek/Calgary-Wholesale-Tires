import React, { useContext, useState } from "react";
import "./Navbar.scss";
import Filter from "../filter/filter";
import { IoIosSearch, IoIosHeart } from "react-icons/io"; // Use filled heart icon
import { useNavigate, createSearchParams, Link } from "react-router-dom"; // Add useNavigate for navigation
import axios from "axios"; // You might use Axios or fetch API for the backend call
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
  const navigate = useNavigate(); // Use navigate for routing
  const { currentUser } = useContext(AuthContext); // Access current user from Context

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    try {
      // console.log("Searching for:", searchQuery);
      // Make API call to fetch products based on search query
      const response = await axios.get(
        `http://localhost:8800/api/products/search`,
        {
          params: { query: searchQuery },
        }
      );
      // console.log("Search response:", response.data);
      const { filteredProducts, allProducts } = response.data;

      // Navigate to the FilteredProductPage and pass the results
      navigate("/filter-products", {
        state: {
          filteredProducts,
          allProducts,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleWishlistClick = () => {
    // console.log("Wishlist clicked!"); // Add any logic you need here
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

        {/* Menu */}
        <label htmlFor="name" className="label">
          Search Products:
        </label>
        {/* Search Bar */}
        <div className={`search ${currentUser ? "signed-in" : ""}`}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by part # or tag"
              className="input"
            />
            <button type="submit" className="searchIcon">
              <IoIosSearch className="svg" />
            </button>
          </form>
        </div>

        <div className="right">
          {currentUser ? (
            <div className="user-options">
              {/* Cart Section */}
              <a href="/orderHistory" className="my-account-link">
              <img src="/assets/booking.png" alt="orders" className="bookingIcon" />
                My Orders
              </a>
              <a className="cart" href="/cart">
                <img src="/assets/cart.png" alt="cart" className="cartIcon" />
                <span>Cart</span>
              </a>

              {/* Profile Section */}
              <a
                className="profile"
                href="/profilePage"
                style={{ cursor: "pointer" }}
              >
                <img src="/assets/user.png" alt="user" />
                <span>{currentUser.firstName}</span>
              </a>
            </div>
          ) : (
            <a className="signIn" href="/login">
              <img src="/assets/user.png" alt="user" />
              <span>Sign In</span>
            </a>
          )}
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
          <a href="/">My Account</a>
        </div>
      </div>

      {/* Bottom Filter */}
      <Filter />
    </nav>
  );
};

export default Navbar;
