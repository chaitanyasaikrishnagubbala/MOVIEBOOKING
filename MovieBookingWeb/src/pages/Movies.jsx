import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import { getAllMovies } from "../service/movieService";

function Movies() {
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

  return (
    <div className="movies-page">

      <Navbar />

      <main>

        <section className="movies-header">
          <h1>Movies</h1>

          <p>
            Explore the latest movies and book your tickets.
          </p>
        </section>

        <SearchBar />

        <section className="movies-section">

          <div className="movies-grid">

            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Movies;