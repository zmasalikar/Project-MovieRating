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
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`)
      .then(res => res.json())
      .then(async data => {
        if (data.Search) {
          const detailed = await Promise.all(
            data.Search.map(item =>
              fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}`)
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
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 Movie Review App</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <FilterBar
        setGenreFilter={setGenreFilter}
        setYearFilter={setYearFilter}
        setRatingFilter={setRatingFilter}
      />
      {filteredMovies.length === 0 ? (
        <p className="text-center text-gray-600">No movies found. Try a different search or filter.</p>
      ) : (
        <MovieList movies={filteredMovies} onMovieClick={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default App;

