import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./categories.scss";
import Dropdown from "../dropdown/dropdown.jsx";

export default function Categories() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenu =()=>{setOpenMenu((prev) => !prev)
  }
  return (
    <div className="menuBtn" >
      <a href="/" className="categories" >
        <RxHamburgerMenu
          className="img"
          onClick={handleMenu}
        />
      </a>
      {openMenu && <Dropdown />}
    </div>
  );
}
