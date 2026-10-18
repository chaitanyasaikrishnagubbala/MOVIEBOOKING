import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getShowsByMovieId } from "../service/showService";

function Shows() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShowsByMovieId(movieId);
        setShows(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, [movieId]);

  return (
    <>
      <Navbar />

      <main className="shows-page">

        <div className="shows-header">
          <p className="shows-label">
            MOVIE SHOWS
          </p>

          <h1>Available Shows</h1>

          <p>
            Choose a showtime and select your seats.
          </p>
        </div>

        {shows.length === 0 ? (
          <div className="no-shows">
            <h2>No Shows Available</h2>

            <p>
              There are currently no shows available for this movie.
            </p>
          </div>
        ) : (
          <section className="shows-grid">

            {shows.map((show) => (
              <div
                className="show-card"
                key={show.id}
              >

                <div className="show-card-header">
                  <span className="show-date">
                    {show.showDate}
                  </span>

                  <span className="show-price">
                    ₹{show.ticketPrice}
                  </span>
                </div>

                <div className="show-time">
                  {show.showTime}
                </div>

                <div className="show-details">

                  <p>
                    <strong>Screen</strong>
                    <span>
                      {show.screen?.name || `Screen ${show.screen?.id || ""}`}
                    </span>
                  </p>

                  <p>
                    <strong>Ticket Price</strong>
                    <span>
                      ₹{show.ticketPrice}
                    </span>
                  </p>

                </div>

                <button
                  className="select-seats-button"
                  onClick={() =>
                    navigate(
                      `/seats/${show.id}/${show.screen.id}`
                    )
                  }
                >
                  Select Seats
                </button>

              </div>
            ))}

          </section>
        )}

      </main>

      <Footer />
    </>
  );
}

export default Shows;