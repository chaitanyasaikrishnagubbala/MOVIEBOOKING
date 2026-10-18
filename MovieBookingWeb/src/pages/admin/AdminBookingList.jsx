import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  getAllBookings,
  cancelBooking
} from "../../service/bookingService";


function AdminBookingList() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================
  // GET ALL BOOKINGS
  // =========================

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const data = await getAllBookings();

      setBookings(data);

    } catch (error) {

      console.error(
        "Get Bookings Error:",
        error
      );

      alert("Failed to load bookings");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchBookings();

  }, []);


  // =========================
  // CANCEL BOOKING
  // =========================

  const handleCancel = async (id) => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this booking?"
      );

    if (!confirmCancel) {
      return;
    }


    try {

      await cancelBooking(id);

      alert(
        "Booking cancelled successfully"
      );

      fetchBookings();

    } catch (error) {

      console.error(
        "Cancel Booking Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to cancel booking"
      );
    }
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <>
        <Navbar />

        <main className="admin-list-page">

          <h2>
            Loading bookings...
          </h2>

        </main>

        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />

      <main className="admin-list-page">

        {/* HEADER */}

        <div className="admin-list-header">

          <div>

            <h1>
              Manage Bookings
            </h1>

            <p>
              View and manage customer bookings
            </p>

          </div>

        </div>


        {/* EMPTY STATE */}

        {bookings.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Bookings Found
            </h2>

          </div>

        ) : (

          <div className="admin-table-container">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    ID
                  </th>

                  <th>
                    User
                  </th>

                  <th>
                    Movie
                  </th>

                  <th>
                    Show Date
                  </th>

                  <th>
                    Show Time
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {bookings.map((booking) => (

                  <tr key={booking.id}>

                    {/* BOOKING ID */}

                    <td>
                      {booking.id}
                    </td>


                    {/* USER */}

                    <td>

                      {booking.user ? (
                        <>
                          <div>
                            {booking.user.username}
                          </div>

                          <small>
                            {booking.user.email}
                          </small>
                        </>
                      ) : (
                        "Unknown"
                      )}

                    </td>


                    {/* MOVIE */}

                    <td>

                      {booking.show?.movie?.title ||
                        "Unknown"}

                    </td>


                    {/* SHOW DATE */}

                    <td>

                      {booking.show?.showDate ||
                        "-"}

                    </td>


                    {/* SHOW TIME */}

                    <td>

                      {booking.show?.showTime ||
                        "-"}

                    </td>


                    {/* AMOUNT */}

                    <td>

                      ₹{booking.totalAmount}

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          booking.bookingStatus ===
                          "CANCELLED"
                            ? "booking-status cancelled"
                            : "booking-status confirmed"
                        }
                      >

                        {booking.bookingStatus}

                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      {booking.bookingStatus !==
                        "CANCELLED" && (

                        <button
                          className="admin-delete-button"
                          onClick={() =>
                            handleCancel(
                              booking.id
                            )
                          }
                        >
                          Cancel
                        </button>

                      )}

                      {booking.bookingStatus ===
                        "CANCELLED" && (

                        <span>
                          Cancelled
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </main>

      <Footer />
    </>
  );
}


export default AdminBookingList;