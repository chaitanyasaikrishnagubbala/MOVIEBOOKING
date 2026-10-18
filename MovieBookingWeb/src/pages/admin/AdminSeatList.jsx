import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  getAllSeats,
  deleteSeat
} from "../../service/seatService";


function AdminSeatList() {

  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================
  // GET ALL SEATS
  // =========================

  const fetchSeats = async () => {

    try {

      setLoading(true);

      const data = await getAllSeats();

      setSeats(data);

    } catch (error) {

      console.error(
        "Error fetching seats:",
        error
      );

      alert("Failed to load seats");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchSeats();

  }, []);


  // =========================
  // DELETE SEAT
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this seat?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      await deleteSeat(id);

      alert("Seat deleted successfully");

      fetchSeats();

    } catch (error) {

      console.error(
        "Delete Seat Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete seat"
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
            Loading seats...
          </h2>

        </main>

        <Footer />
      </>
    );
  }


  // =========================
  // UI
  // =========================

  return (
    <>
      <Navbar />

      <main className="admin-list-page">

        <div className="admin-list-header">

          <div>

            <h1>
              Manage Seats
            </h1>

            <p>
              Add, update and delete screen seats
            </p>

          </div>


          <Link
            to="/admin/seats/add"
            className="admin-add-button"
          >
            + Add Seat
          </Link>

        </div>


        {seats.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Seats Found
            </h2>

            <p>
              Add a seat to get started.
            </p>

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
                    Seat Number
                  </th>

                  <th>
                    Seat Type
                  </th>

                  <th>
                    Screen
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {seats.map((seat) => (

                  <tr key={seat.id}>

                    <td>
                      {seat.id}
                    </td>

                    <td>
                      {seat.seatNumber}
                    </td>

                    <td>
                      {seat.seatType}
                    </td>

                    <td>
                      {seat.screen?.name || "N/A"}
                    </td>

                    <td>

                      <div className="admin-actions">

                        <Link
                          to={`/admin/seats/edit/${seat.id}`}
                          className="admin-edit-button"
                        >
                          Edit
                        </Link>


                        <button
                          onClick={() =>
                            handleDelete(seat.id)
                          }
                          className="admin-delete-button"
                        >
                          Delete
                        </button>

                      </div>

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


export default AdminSeatList;