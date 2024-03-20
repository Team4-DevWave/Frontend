import React, { useState, useRef } from "react";
import "./SortOptions.css";

function SortOptions() {
  const [currentSortOption, setCurrentSortOption] = useState("Best");
  const sortOptions = useRef(null);

  const toggleMenu = () => {
    if (sortOptions.current) {
      sortOptions.current.classList.toggle("open-menu");
    }
  };

  const handleSortOptionClick = (sortOption) => {
    setCurrentSortOption(sortOption);
  };

  return (
    <div className="sort-options">
      <button className="sort-options-button" onClick={toggleMenu}>
        {currentSortOption}
        <svg
          rpl=""
          fill="currentColor"
          height="16"
          icon-name="caret-down-outline"
          viewBox="0 0 20 20"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
        </svg>
        <div className="sort-option-wrap" ref={sortOptions}>
          <div className="sort-option">
            <p className="sort-by">Sort by</p>
            <a
              href="#home"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("Best")}
            >
              <p>Best</p>
            </a>
            <a
              href="#home"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("Hot")}
            >
              <p>Hot</p>
            </a>
            <a
              href="#home"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("New")}
            >
              <p>New</p>
            </a>
            <a
              href="#home"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("Top")}
            >
              <p>Top</p>
            </a>
            <a
              href="#home"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("Rising")}
            >
              <p>Rising</p>
            </a>
          </div>
        </div>
      </button>
      <hr />
    </div>
  );
}

export default SortOptions;
