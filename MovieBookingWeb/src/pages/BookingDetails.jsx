import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import api from "../service/api";

import { getBookedSeatNumbers } from "../service/bookingService";

function BookingDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [seatNumbers, setSeatNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const bookingResponse = await api.get(
          `/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBooking(bookingResponse.data);

        const seats =
          await getBookedSeatNumbers(bookingId);

        setSeatNumbers(seats);

      } catch (error) {
        console.error(
          "Error fetching booking details:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="ticket-page">
          <div className="ticket-loading">
            <h2>Loading your ticket...</h2>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (!booking) {
    return (
      <>
        <Navbar />

        <main className="ticket-page">

          <div className="ticket-not-found">

            <h2>Booking not found</h2>

            <button
              className="back-bookings-button"
              onClick={() =>
                navigate("/my-bookings")
              }
            >
              Back to My Bookings
            </button>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="ticket-page">

        <div className="ticket-card">

          {/* HEADER */}

          <div className="ticket-header">

            <div>
              <p className="ticket-label">
                MOVIE TICKET
              </p>

              <h1>
                {booking.show?.movie?.title}
              </h1>
            </div>

            <span
              className={`ticket-status ${
                booking.bookingStatus === "CONFIRMED"
                  ? "ticket-confirmed"
                  : "ticket-cancelled"
              }`}
            >
              {booking.bookingStatus}
            </span>

          </div>

          {/* BOOKING ID */}

          <div className="ticket-booking-id">

            Booking #{booking.id}

          </div>

          {/* MOVIE INFO */}

          <div className="ticket-section">

            <h3>Movie Information</h3>

            <div className="ticket-grid">

              <div>
                <span>Genre</span>
                <strong>
                  {booking.show?.movie?.genre}
                </strong>
              </div>

              <div>
                <span>Language</span>
                <strong>
                  {booking.show?.movie?.language}
                </strong>
              </div>

            </div>

          </div>

          {/* SHOW INFORMATION */}

          <div className="ticket-section">

            <h3>Show Information</h3>

            <div className="ticket-grid">

              <div>
                <span>Theater</span>
                <strong>
                  {booking.show?.screen?.theater?.name}
                </strong>
              </div>

              <div>
                <span>City</span>
                <strong>
                  {booking.show?.screen?.theater?.city}
                </strong>
              </div>

              <div>
                <span>Address</span>
                <strong>
                  {booking.show?.screen?.theater?.address}
                </strong>
              </div>

              <div>
                <span>Show Time</span>
                <strong>
                  {booking.show?.showTime}
                </strong>
              </div>

            </div>

          </div>

          {/* SEATS */}

          <div className="ticket-seats">

            <h3>Your Seats</h3>

            <div className="ticket-seat-list">

              {seatNumbers.length > 0 ? (

                seatNumbers.map((seat) => (
                  <span key={seat}>
                    {seat}
                  </span>
                ))

              ) : (

                <p>No seats found</p>

              )}

            </div>

          </div>

          {/* PAYMENT */}

          <div className="ticket-payment">

            <div>

              <span>Total Amount</span>

              <strong>
                ₹{booking.totalAmount}
              </strong>

            </div>

            <div>

              <span>Booking Time</span>

              <strong>
                {booking.bookingTime}
              </strong>

            </div>

          </div>

          {/* TRANSACTION */}

          {booking.transaction && (

            <div className="transaction-section">

              <h3>Payment Details</h3>

              <div className="ticket-grid">

                <div>
                  <span>Payment Method</span>

                  <strong>
                    {booking.transaction.paymentMethod}
                  </strong>
                </div>

                <div>
                  <span>Payment Status</span>

                  <strong>
                    {booking.transaction.paymentStatus}
                  </strong>
                </div>

                <div>
                  <span>Transaction ID</span>

                  <strong>
                    {booking.transaction.transactionId}
                  </strong>
                </div>

              </div>

            </div>

          )}

          {/* FOOTER */}

          <div className="ticket-footer">

            <p>
              Thank you for booking with MovieBooking!
            </p>

            <button
              className="back-bookings-button"
              onClick={() =>
                navigate("/my-bookings")
              }
            >
              Back to My Bookings
            </button>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default BookingDetails;