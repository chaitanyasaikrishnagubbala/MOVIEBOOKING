import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getSeatsByScreen } from "../service/seatService";

import {
  getBookedSeatIds,
  bookTickets,
} from "../service/bookingService";

function SeatSelection() {
  const { showId, screenId } = useParams();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeatIds, setBookedSeatIds] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatData = await getSeatsByScreen(screenId);
        const bookedData = await getBookedSeatIds(showId);

        console.log("SHOW ID:", showId);
        console.log("SCREEN ID:", screenId);
        console.log("ALL SEATS:", seatData);
        console.log("BOOKED SEAT IDS:", bookedData);

        setSeats(seatData);
        setBookedSeatIds(bookedData);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [screenId, showId]);

  const handleSeatClick = (seat) => {
    const isBooked = bookedSeatIds.some(
      (id) => Number(id) === Number(seat.id)
    );

    if (isBooked) {
      return;
    }

    setSelectedSeats((previousSeats) => {
      const alreadySelected = previousSeats.some(
        (selectedSeat) => selectedSeat.id === seat.id
      );

      if (alreadySelected) {
        return previousSeats.filter(
          (selectedSeat) => selectedSeat.id !== seat.id
        );
      }

      return [...previousSeats, seat];
    });
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    const bookingData = {
      showId: Number(showId),
      seatIds: selectedSeats.map((seat) => seat.id),
      paymentMethod: paymentMethod,
    };

    try {
      const response = await bookTickets(bookingData);

      alert(
        `Booking Successful!\n\n` +
        `Booking ID: ${response.bookingId}\n` +
        `Total Amount: ₹${response.totalAmount}`
      );

      console.log("Booking Response:", response);

      setSelectedSeats([]);

      setBookedSeatIds((previousIds) => [
        ...previousIds,
        ...bookingData.seatIds,
      ]);
    } catch (error) {
      console.error("Booking failed:", error);

      alert(
        error.response?.data?.message ||
        "Booking failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="seat-page">

        <div className="seat-header">

          <p className="seat-label">
            BOOK YOUR TICKETS
          </p>

          <h1>Select Your Seats</h1>

          <p>
            Choose your preferred seats and confirm your booking.
          </p>

        </div>

        {/* SCREEN */}

        <section className="screen-section">

          <div className="screen">
            SCREEN
          </div>

          <p className="screen-hint">
            All eyes on the screen
          </p>

        </section>

        {/* LEGEND */}

        <div className="seat-legend">

          <div className="legend-item">
            <span className="legend-box available"></span>
            Available
          </div>

          <div className="legend-item">
            <span className="legend-box selected"></span>
            Selected
          </div>

          <div className="legend-item">
            <span className="legend-box booked"></span>
            Booked
          </div>

        </div>

        {/* SEATS */}

        {seats.length === 0 ? (

          <div className="no-seats">
            <h2>No seats available</h2>
            <p>There are no seats available for this screen.</p>
          </div>

        ) : (

          <section className="seat-layout">

            {seats.map((seat) => {

              const isSelected = selectedSeats.some(
                (selectedSeat) =>
                  Number(selectedSeat.id) === Number(seat.id)
              );

              const isBooked = bookedSeatIds.some(
                (id) =>
                  Number(id) === Number(seat.id)
              );

              return (
                <button
                  key={seat.id}
                  className={`seat ${
                    isBooked
                      ? "seat-booked"
                      : isSelected
                      ? "seat-selected"
                      : "seat-available"
                  }`}
                  onClick={() => handleSeatClick(seat)}
                  disabled={isBooked}
                >
                  {seat.seatNumber}
                </button>
              );
            })}

          </section>
        )}

        {/* BOOKING SUMMARY */}

        <section className="booking-summary">

          <div className="summary-left">

            <h2>Booking Summary</h2>

            <p>
              <strong>Selected Seats:</strong>
            </p>

            {selectedSeats.length === 0 ? (

              <p className="empty-selection">
                No seats selected
              </p>

            ) : (

              <div className="selected-seat-list">

                {selectedSeats.map((seat) => (
                  <span key={seat.id}>
                    {seat.seatNumber}
                  </span>
                ))}

              </div>

            )}

          </div>

          {/* PAYMENT */}

          <div className="payment-section">

            <h3>Payment Method</h3>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              className="payment-select"
            >

              <option value="UPI">
                UPI
              </option>

              <option value="CARD">
                Card
              </option>

              <option value="NET_BANKING">
                Net Banking
              </option>

            </select>

            <button
              className="confirm-booking-button"
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
            >
              Confirm Booking
            </button>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default SeatSelection;