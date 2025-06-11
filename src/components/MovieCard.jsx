import React from "react";
import StarRating from "./StarRating";

const MovieCard = ({ movie, onClick }) => {
  const rating = Number(localStorage.getItem(movie.imdbID)) || 0;

  return (
    <div
      onClick={onClick}
      className="bg-white p-3 rounded shadow cursor-pointer hover:shadow-md transition"
    >
      <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded mb-2" />
      <h2 className="text-lg font-semibold">{movie.Title}</h2>
      <p className="text-sm text-gray-600">{movie.Year}</p>
      <p className="text-sm text-gray-600">{movie.Genre}</p>
      <StarRating movieId={movie.imdbID} initialRating={rating} readOnly />
    </div>
  );
};

export default MovieCard;
