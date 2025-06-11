import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetailModal from "./components/MovieDetailModal";
import FilterBar from "./components/FilterBar";

const API_KEY = "26474382";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("batman");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`)
      .then(res => res.json())
      .then(async data => {
        if (data.Search) {
          const detailed = await Promise.all(
            data.Search.map(item =>
              fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}`)
                .then(res => res.json())
            )
          );
          setMovies(detailed);
        } else {
          setMovies([]);
        }
      });
  }, [searchTerm]);

  const filteredMovies = movies.filter(movie => {
    const matchGenre = genreFilter ? movie.Genre?.includes(genreFilter) : true;
    const matchYear = yearFilter ? movie.Year === yearFilter : true;
    const storedRating = localStorage.getItem(movie.imdbID);
    const matchRating = ratingFilter ? parseInt(storedRating || 0) >= ratingFilter : true;
    return matchGenre && matchYear && matchRating;
  });

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen text-black font-sans p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6 drop-shadow-lg text-black">🎬 Movie Review Galaxy</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <SearchBar onSearch={(term) => setSearchTerm(term)} />
          <FilterBar
            setGenreFilter={setGenreFilter}
            setYearFilter={setYearFilter}
            setRatingFilter={setRatingFilter}
          />
        </div>

        {filteredMovies.length === 0 ? (
          <p className="text-center text-gray-700 mt-10">No movies found. Try a different search or filter.</p>
        ) : (
          <MovieList movies={filteredMovies} onMovieClick={setSelectedMovie} />
        )}

        {selectedMovie && (
          <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>
    </div>
  );
};

export default App;
