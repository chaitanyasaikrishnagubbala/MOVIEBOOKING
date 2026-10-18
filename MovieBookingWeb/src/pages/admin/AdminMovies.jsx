import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

const BASE_URL = "http://localhost:8081/movies";

const emptyMovie = {
  title: "",
  genre: "",
  language: "",
  duration: "",
  releaseDate: "",
  description: "",
  posterUrl: "",
  rating: "",
};

function AdminMovies() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(emptyMovie);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);


  // =========================
  // GET ALL MOVIES
  // =========================

  const fetchMovies = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(response.data);

    } catch (error) {

      console.error("Error fetching movies:", error);

      alert("Failed to load movies");
    }
  };


  useEffect(() => {
    fetchMovies();
  }, []);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: value,
    });
  };


  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      const movieData = {
        ...movie,
        duration: Number(movie.duration),
        rating: Number(movie.rating),
      };


      if (editingId) {

        // UPDATE
        await axios.put(
          `${BASE_URL}/${editingId}`,
          movieData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Movie updated successfully");

      } else {

        // CREATE
        await axios.post(
          BASE_URL,
          movieData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Movie added successfully");
      }


      // Clear form
      setMovie(emptyMovie);

      setEditingId(null);

      // Refresh movie list
      fetchMovies();

    } catch (error) {

      console.error("Movie operation failed:", error);

      alert(
        error.response?.data?.message ||
        "Movie operation failed"
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (movie) => {

    setMovie({
      title: movie.title,
      genre: movie.genre,
      language: movie.language,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
      description: movie.description,
      posterUrl: movie.posterUrl || "",
      rating: movie.rating,
    });

    setEditingId(movie.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${BASE_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Movie deleted successfully");

      fetchMovies();

    } catch (error) {

      console.error("Delete failed:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete movie"
      );
    }
  };


  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {

    setMovie(emptyMovie);

    setEditingId(null);
  };


  return (
    <>
      <Navbar />

      <main className="admin-movies">

        <h1>Movie Management</h1>


        {/* =========================
            MOVIE FORM
            ========================= */}

        <section className="admin-movie-form">

          <h2>
            {editingId
              ? "Edit Movie"
              : "Add New Movie"}
          </h2>


          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Movie Title"
              value={movie.title}
              onChange={handleChange}
              required
            />


            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={movie.genre}
              onChange={handleChange}
              required
            />


            <input
              type="text"
              name="language"
              placeholder="Language"
              value={movie.language}
              onChange={handleChange}
              required
            />


            <input
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              value={movie.duration}
              onChange={handleChange}
              required
            />


            <input
              type="date"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={handleChange}
              required
            />


            <textarea
              name="description"
              placeholder="Movie Description"
              value={movie.description}
              onChange={handleChange}
              required
            />


            <input
              type="text"
              name="posterUrl"
              placeholder="Poster URL"
              value={movie.posterUrl}
              onChange={handleChange}
            />


            <input
              type="number"
              name="rating"
              placeholder="Rating"
              min="0"
              max="10"
              step="0.1"
              value={movie.rating}
              onChange={handleChange}
              required
            />


            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Movie"
                : "Add Movie"}
            </button>


            {editingId && (

              <button
                type="button"
                onClick={handleCancelEdit}
              >
                Cancel Edit
              </button>

            )}

          </form>

        </section>


        {/* =========================
            MOVIE LIST
            ========================= */}

        <section className="admin-movie-list">

          <h2>All Movies</h2>


          {movies.length === 0 ? (

            <p>
              No movies available.
            </p>

          ) : (

            <div className="admin-movie-grid">

              {movies.map((movie) => (

                <div
                  className="admin-movie-card"
                  key={movie.id}
                >

                  <img
                    src={`/${movie.posterUrl}`}
                    alt={movie.title}
                  />


                  <h3>
                    {movie.title}
                  </h3>


                  <p>
                    Genre: {movie.genre}
                  </p>


                  <p>
                    Language: {movie.language}
                  </p>


                  <p>
                    Duration: {movie.duration} min
                  </p>


                  <p>
                    Release Date: {movie.releaseDate}
                  </p>


                  <p>
                    Rating: ⭐ {movie.rating}
                  </p>


                  <button
                    onClick={() =>
                      handleEdit(movie)
                    }
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(movie.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default AdminMovies;