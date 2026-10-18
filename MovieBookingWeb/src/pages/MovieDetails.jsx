import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMovieById } from "../service/movieService";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <>
        <Navbar />

        <div className="movie-loading">
          <h2>Loading movie...</h2>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="movie-details-page">

        <section className="movie-details">

          <div className="movie-details-poster">
            <img
              src={`/${movie.posterUrl}`}
              alt={movie.title}
            />
          </div>

          <div className="movie-details-content">

            <p className="movie-details-label">
              MOVIE DETAILS
            </p>

            <h1>{movie.title}</h1>

            <div className="movie-details-rating">
              ⭐ {movie.rating}
            </div>

            <div className="movie-details-info">

              <p>
                <strong>Genre</strong>
                <span>{movie.genre}</span>
              </p>

              <p>
                <strong>Language</strong>
                <span>{movie.language}</span>
              </p>

              <p>
                <strong>Duration</strong>
                <span>{movie.duration} minutes</span>
              </p>

              <p>
                <strong>Release Date</strong>
                <span>{movie.releaseDate}</span>
              </p>

            </div>

            <div className="movie-description">
              <h3>About the Movie</h3>

              <p>{movie.description}</p>
            </div>

            <button
              className="shows-button"
              onClick={() => navigate(`/shows/${movie.id}`)}
            >
              View Shows
            </button>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default MovieDetails;