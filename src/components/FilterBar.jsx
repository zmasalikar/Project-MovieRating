import React from "react";

const FilterBar = ({ setGenreFilter, setYearFilter, setRatingFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center">
      <select
        onChange={(e) => setGenreFilter(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Adventure">Adventure</option>
        {/* Add more genres as needed */}
      </select>

      <input
        type="text"
        placeholder="Year"
        onChange={(e) => setYearFilter(e.target.value)}
        className="p-2 border rounded"
      />

      <select
        onChange={(e) => setRatingFilter(Number(e.target.value))}
        className="p-2 border rounded"
      >
        <option value="0">All Ratings</option>
        <option value="1">1 Star & up</option>
        <option value="2">2 Stars & up</option>
        <option value="3">3 Stars & up</option>
        <option value="4">4 Stars & up</option>
        <option value="5">5 Stars only</option>
      </select>
    </div>
  );
};

export default FilterBar;
