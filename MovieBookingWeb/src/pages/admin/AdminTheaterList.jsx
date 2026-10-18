import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  getAllTheaters,
  deleteTheater,
} from "../../service/adminTheaterService";

function AdminTheaterList() {

  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  // =========================
  // GET ALL THEATERS
  // =========================

  useEffect(() => {
    fetchTheaters();
  }, []);


  const fetchTheaters = async () => {

    try {

      const data = await getAllTheaters();

      setTheaters(data);

    } catch (error) {

      console.error(
        "Error fetching theaters:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // DELETE THEATER
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this theater?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      await deleteTheater(id);

      alert("Theater deleted successfully");

      // Remove deleted theater from UI
      setTheaters((previousTheaters) =>
        previousTheaters.filter(
          (theater) => theater.id !== id
        )
      );

    } catch (error) {

      console.error(
        "Error deleting theater:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete theater"
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

        <main className="admin-theaters">

          <h2>
            Loading theaters...
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

      <main className="admin-theaters">

        <h1>
          Manage Theaters
        </h1>


        {/* =========================
            ADD THEATER
        ========================= */}

        <button
          className="admin-add-button"
          onClick={() =>
            navigate("/admin/theaters/add")
          }
        >
          Add Theater
        </button>


        {/* =========================
            THEATER LIST
        ========================= */}

        {theaters.length === 0 ? (

          <p>
            No theaters found.
          </p>

        ) : (

          <div className="admin-theater-grid">

            {theaters.map((theater) => (

              <div
                key={theater.id}
                className="admin-theater-card"
              >

                <h2>
                  {theater.name}
                </h2>


                <p>
                  <strong>
                    City:
                  </strong>{" "}
                  {theater.city}
                </p>


                <p>
                  <strong>
                    Address:
                  </strong>{" "}
                  {theater.address}
                </p>


                {/* =========================
                    ACTION BUTTONS
                ========================= */}

                <div className="admin-theater-actions">

                  {/* EDIT */}

                  <button
                    className="admin-edit-button"
                    onClick={() =>
                      navigate(
                        `/admin/theaters/edit/${theater.id}`
                      )
                    }
                  >
                    Edit
                  </button>


                  {/* DELETE */}

                  <button
                    className="admin-delete-button"
                    onClick={() =>
                      handleDelete(theater.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      <Footer />
    </>
  );
}

export default AdminTheaterList;