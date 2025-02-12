import React from "react";

const Search = ({ setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by Title..."
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-box"
    />
  );
};

export default Search;
