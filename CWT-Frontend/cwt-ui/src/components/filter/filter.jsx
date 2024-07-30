import React from "react";
import "./filter.scss";

const Filter = () => {
  return (
    <div className="filter-bar">
      <span className="filter-title">SEARCH BY VEHICLES</span>
      <select className="filter-select">
        <option value="" disabled selected>
          Year
        </option>
      </select>
      <select className="filter-select">
        <option value="" disabled selected>
          Model
        </option>
      </select>
      <select className="filter-select">
        <option value="" disabled selected>
          Make
        </option>
      </select>
      <select className="filter-select">
        <option value="" disabled selected>
          Diameter
        </option>
      </select>
        <button className="filter-button">SUBMIT</button>
        <button className="reset-button">RESET</button>
    </div>
  );
};

export default Filter;
