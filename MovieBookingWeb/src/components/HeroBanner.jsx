import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/movies");
  };

  return (
    <section className="hero-banner">

      <div className="hero-content">

        <p className="hero-subtitle">
          WELCOME TO MOVIEBOOKING
        </p>

        <h1>
          Book Your Favorite Movies
        </h1>

        <p className="hero-description">
          Discover the latest movies, choose your favorite seats,
          and book your tickets in just a few clicks.
        </p>

        <button
          className="hero-button"
          onClick={handleBookNow}
        >
          Book Now
        </button>

      </div>

    </section>
  );
}

export default HeroBanner;