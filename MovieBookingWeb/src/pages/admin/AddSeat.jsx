import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { addSeat } from "../../service/seatService";
import { getAllScreens } from "../../service/screenService";


function AddSeat() {

  const navigate = useNavigate();

  const [screens, setScreens] = useState([]);

  const [seat, setSeat] = useState({
    seatNumber: "",
    seatType: "",
    screenId: ""
  });


  // =========================
  // LOAD SCREENS
  // =========================

  useEffect(() => {

    const loadScreens = async () => {

      try {

        const data = await getAllScreens();

        setScreens(data);

      } catch (error) {

        console.error(
          "Error loading screens:",
          error
        );

        alert("Failed to load screens");
      }
    };

    loadScreens();

  }, []);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setSeat({
      ...seat,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // ADD SEAT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const seatData = {

        seatNumber: seat.seatNumber,

        seatType: seat.seatType,

        screen: {
          id: Number(seat.screenId)
        }

      };


      await addSeat(seatData);

      alert("Seat added successfully");

      navigate("/admin/seats");

    } catch (error) {

      console.error(
        "Add Seat Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to add seat"
      );
    }
  };


  return (
    <>
      <Navbar />

      <main className="admin-form-page">

        <div className="admin-form-card">

          <h1>
            Add Seat
          </h1>

          <p>
            Create a new seat for a screen
          </p>


          <form onSubmit={handleSubmit}>

            {/* Seat Number */}

            <div className="form-group">

              <label>
                Seat Number
              </label>

              <input
                type="text"
                name="seatNumber"
                placeholder="Example: A1"
                value={seat.seatNumber}
                onChange={handleChange}
                required
              />

            </div>


            {/* Seat Type */}

            <div className="form-group">

              <label>
                Seat Type
              </label>

              <select
                name="seatType"
                value={seat.seatType}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Seat Type
                </option>

                <option value="REGULAR">
                  Regular
                </option>

                <option value="PREMIUM">
                  Premium
                </option>

                <option value="RECLINER">
                  Recliner
                </option>

              </select>

            </div>


            {/* Screen */}

            <div className="form-group">

              <label>
                Screen
              </label>

              <select
                name="screenId"
                value={seat.screenId}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Screen
                </option>

                {screens.map((screen) => (

                  <option
                    key={screen.id}
                    value={screen.id}
                  >
                    {screen.name}
                  </option>

                ))}

              </select>

            </div>


            {/* Buttons */}

            <div className="admin-form-actions">

              <button
                type="submit"
                className="admin-save-button"
              >
                Add Seat
              </button>


              <button
                type="button"
                className="admin-cancel-button"
                onClick={() =>
                  navigate("/admin/seats")
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


export default AddSeat;