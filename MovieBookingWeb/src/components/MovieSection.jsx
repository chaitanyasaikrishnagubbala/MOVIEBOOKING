import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../service/movieService";

function MovieSection({ searchText }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="movie-section">

      <div className="movie-section-header">
        <div>
          <h2>Now Showing</h2>
          <p>Watch the latest movies in theatres now.</p>
        </div>
      </div>

      <div className="home-movies-grid">

        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            home={true}
          />
        ))}

      </div>

    </section>
  );
}

export default MovieSection;