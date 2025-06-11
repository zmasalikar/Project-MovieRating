import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 w-full max-w-md rounded border border-gray-300"
      />
    </div>
  );
};

export default SearchBar;
