import { Link } from "react-router-dom";

function MovieCard({ movie, home }) {
  return (
    <div className={`movie-card ${home ? "home-card" : ""}`}>

      <div className="movie-poster">
        <img
          src={`/${movie.posterUrl}`}
          alt={movie.title}
        />

        <div className="movie-rating">
          ⭐ {movie.rating}
        </div>
      </div>

      <div className="movie-card-content">

        <h2>{movie.title}</h2>

        {home ? (
          <Link
            to={`/movie/${movie.id}`}
            className="movie-details-button"
          >
            View Details
          </Link>
        ) : (
          <>
            <div className="movie-info">
              <p>
                <strong>Genre:</strong> {movie.genre}
              </p>

              <p>
                <strong>Language:</strong> {movie.language}
              </p>

              <p>
                <strong>Duration:</strong> {movie.duration} minutes
              </p>
            </div>

            <Link
              to={`/movie/${movie.id}`}
              className="movie-details-button"
            >
              View Details
            </Link>
          </>
        )}

      </div>

    </div>
  );
}

export default MovieCard;