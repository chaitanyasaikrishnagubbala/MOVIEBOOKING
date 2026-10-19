import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import api from "../../service/api";

function EditTheater() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [theater, setTheater] = useState({
    name: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  // =========================
  // GET THEATER
  // =========================

  useEffect(() => {

    const fetchTheater = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          `/theaters/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTheater({
          name: response.data.name,
          city: response.data.city,
          address: response.data.address,
        });

      } catch (error) {

        console.error(
          "Error fetching theater:",
          error
        );

        alert("Failed to load theater");

      } finally {

        setLoading(false);

      }
    };

    fetchTheater();

  }, [id]);


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setTheater({
      ...theater,
      [e.target.name]: e.target.value,
    });

  };


  // =========================
  // UPDATE THEATER
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setUpdating(true);

    try {

      const token = localStorage.getItem("token");

      await api.put(
        `/theaters/${id}`,
        theater,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Theater updated successfully!");

      navigate("/admin/theaters");

    } catch (error) {

      console.error(
        "Error updating theater:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update theater"
      );

    } finally {

      setUpdating(false);

    }
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <>
        <Navbar />

        <main className="admin-page">

          <div className="admin-loading">
            Loading theater...
          </div>

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

      <main className="admin-page">

        <div className="admin-form-container">

          <div className="admin-form-header">

            <h1>
              Edit Theater
            </h1>

            <p>
              Update theater information
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="admin-form"
          >

            {/* THEATER NAME */}

            <div className="admin-form-group">

              <label>
                Theater Name
              </label>

              <input
                type="text"
                name="name"
                value={theater.name}
                onChange={handleChange}
                placeholder="Enter theater name"
                required
              />

            </div>


            {/* CITY */}

            <div className="admin-form-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={theater.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />

            </div>


            {/* ADDRESS */}

            <div className="admin-form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                value={theater.address}
                onChange={handleChange}
                placeholder="Enter theater address"
                rows="4"
                required
              />

            </div>


            {/* BUTTONS */}

            <div className="admin-form-actions">

              <button
                type="submit"
                className="admin-submit-button"
                disabled={updating}
              >
                {updating
                  ? "Updating..."
                  : "Update Theater"}
              </button>


              <button
                type="button"
                className="admin-cancel-button"
                onClick={() =>
                  navigate("/admin/theaters")
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default EditTheater;