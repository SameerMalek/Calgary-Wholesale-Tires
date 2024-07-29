"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/public/logo.jpg";

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownVisible(false);
    }, 300);
  };

  return (
    <div className="text-2xl h-20 top-0 w-full bg-gray-800 text-white shadow-md">
      <div className="flex items-center justify-between px-5 h-full">
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="Logo"
            height={40}
            width={40}
            className="rounded-lg"
          />
          <h1 className="font-serif ml-2">Custom Wheels</h1>
        </div>
        <div className="flex items-center">
          <Link href="/" className="ml-10 hover:underline hover:text-amber-600 font-medium">
            Home
          </Link>
          <div
            className="relative ml-10 font-medium"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:underline hover:text-amber-600 focus:outline-none flex items-center">
              Categories
              <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
            </button>
            {dropdownVisible && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white text-black border rounded-lg shadow-lg z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/alloy-wheels" className="block px-4 py-2 hover:bg-gray-200">
                  Alloy Wheels
                </Link>
                <Link href="/steel-wheels" className="block px-4 py-2 hover:bg-gray-200">
                  Steel Wheels
                </Link>
                <Link href="/custom-wheels" className="block px-4 py-2 hover:bg-gray-200">
                  Custom Wheels
                </Link>
              </div>
            )}
          </div>
          <Link href="/trending" className="ml-10 hover:underline hover:text-amber-600 font-medium">
            Trending
          </Link>
          <Link href="/cart" className="ml-10 hover:underline hover:text-amber-600 font-medium flex items-center">
            Your Cart
            <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
          </Link>
          <Link href="/profile" className="ml-10 hover:underline hover:text-amber-600 font-medium flex items-center">
            <FontAwesomeIcon icon={faUser} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
