import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import api from "../../service/api";

function AddTheater() {

  const navigate = useNavigate();

  const [theater, setTheater] = useState({
    name: "",
    city: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setTheater({
      ...theater,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/theaters",
        theater,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Theater added successfully!");

      // Go back to theater list
      navigate("/admin/theaters");

    } catch (error) {

      console.error(
        "Error adding theater:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to add theater"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <>
      <Navbar />

      <main>

        <h1>
          Add Theater
        </h1>


        <form onSubmit={handleSubmit}>

          {/* Theater Name */}

          <div>

            <label>
              Theater Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter theater name"
              value={theater.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* City */}

          <div>

            <label>
              City
            </label>

            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={theater.city}
              onChange={handleChange}
              required
            />

          </div>


          {/* Address */}

          <div>

            <label>
              Address
            </label>

            <textarea
              name="address"
              placeholder="Enter theater address"
              value={theater.address}
              onChange={handleChange}
              required
            />

          </div>


          <br />


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Adding..."
              : "Add Theater"}
          </button>


          <button
            type="button"
            onClick={() =>
              navigate("/admin/theaters")
            }
            style={{
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>

        </form>

      </main>

      <Footer />
    </>
  );
}

export default AddTheater;