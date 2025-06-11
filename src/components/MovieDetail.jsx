import React from "react";
import StarRating from "./StarRating";

const MovieDetailModal = ({ movie, onClose }) => {
  const rating = Number(localStorage.getItem(movie.imdbID)) || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-xl">×</button>
        <img src={movie.Poster} alt={movie.Title} className="w-full h-80 object-cover mb-4 rounded" />
        <h2 className="text-2xl font-bold mb-1">{movie.Title}</h2>
        <p className="text-gray-600 mb-2">{movie.Year} | {movie.Genre}</p>
        <p className="text-sm text-gray-700 mb-4">{movie.Plot}</p>
        <p className="text-sm text-gray-700 mb-2"><strong>Actors:</strong> {movie.Actors}</p>
        <StarRating movieId={movie.imdbID} initialRating={rating} />
      </div>
    </div>
  );
};

export default MovieDetailModal;
