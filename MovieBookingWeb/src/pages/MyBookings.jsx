import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getMyBookings,
  cancelBooking
} from "../service/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      await cancelBooking(bookingId);

      alert("Booking cancelled successfully");

      fetchBookings();

    } catch (error) {
      console.error("Cancellation failed:", error);

      alert(
        error.response?.data?.message ||
        "Failed to cancel booking"
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="bookings-page">
          <div className="bookings-loading">
            <h2>Loading bookings...</h2>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bookings-page">

        <div className="bookings-header">

          <p className="bookings-label">
            YOUR BOOKINGS
          </p>

          <h1>My Bookings</h1>

          <p>
            View and manage all your movie bookings.
          </p>

        </div>

        {bookings.length === 0 ? (

          <div className="no-bookings">

            <h2>No Bookings Yet</h2>

            <p>
              You don't have any movie bookings yet.
            </p>

            <button
              className="browse-movies-button"
              onClick={() => navigate("/movies")}
            >
              Browse Movies
            </button>

          </div>

        ) : (

          <section className="bookings-list">

            {bookings.map((booking) => (

              <div
                className="booking-card"
                key={booking.id}
              >

                {/* HEADER */}

                <div className="booking-card-header">

                  <h2>
                    Booking #{booking.id}
                  </h2>

                  <span
                    className={`booking-status ${
                      booking.bookingStatus === "CONFIRMED"
                        ? "status-confirmed"
                        : "status-cancelled"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>

                </div>

                {/* MOVIE */}

                <div className="booking-movie">

                  <h3>
                    {booking.show?.movie?.title}
                  </h3>

                </div>

                {/* DETAILS */}

                <div className="booking-details">

                  <div className="booking-detail">

                    <span>Theater</span>

                    <strong>
                      {booking.show?.screen?.theater?.name}
                    </strong>

                  </div>

                  <div className="booking-detail">

                    <span>City</span>

                    <strong>
                      {booking.show?.screen?.theater?.city}
                    </strong>

                  </div>

                  <div className="booking-detail">

                    <span>Show Time</span>

                    <strong>
                      {booking.show?.showTime}
                    </strong>

                  </div>

                  <div className="booking-detail">

                    <span>Total Amount</span>

                    <strong>
                      ₹{booking.totalAmount}
                    </strong>

                  </div>

                  <div className="booking-detail">

                    <span>Booking Time</span>

                    <strong>
                      {booking.bookingTime}
                    </strong>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="booking-actions">

                  <button
                    className="view-ticket-button"
                    onClick={() =>
                      navigate(
                        `/booking/${booking.id}`
                      )
                    }
                  >
                    View Ticket
                  </button>

                  {booking.bookingStatus === "CONFIRMED" && (

                    <button
                      className="cancel-booking-button"
                      onClick={() =>
                        handleCancelBooking(
                          booking.id
                        )
                      }
                    >
                      Cancel Booking
                    </button>

                  )}

                </div>

                {/* CANCELLED */}

                {booking.bookingStatus === "CANCELLED" && (

                  <p className="cancelled-message">
                    This booking has been cancelled.
                  </p>

                )}

              </div>

            ))}

          </section>

        )}

      </main>

      <Footer />
    </>
  );
}

export default MyBookings;