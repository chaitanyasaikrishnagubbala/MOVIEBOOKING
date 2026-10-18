import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  getSeatById,
  updateSeat
} from "../../service/seatService";

import { getAllScreens } from "../../service/screenService";


function EditSeat() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [screens, setScreens] = useState([]);

  const [loading, setLoading] = useState(true);


  const [seat, setSeat] = useState({
    seatNumber: "",
    seatType: "",
    screenId: ""
  });


  // =========================
  // LOAD SEAT + SCREENS
  // =========================

  useEffect(() => {

    const loadData = async () => {

      try {

        const seatData =
          await getSeatById(id);

        const screenData =
          await getAllScreens();


        setScreens(screenData);


        setSeat({

          seatNumber:
            seatData.seatNumber || "",

          seatType:
            seatData.seatType || "",

          screenId:
            seatData.screen?.id || ""

        });

      } catch (error) {

        console.error(
          "Load Seat Error:",
          error
        );

        alert("Failed to load seat");

        navigate("/admin/seats");

      } finally {

        setLoading(false);

      }

    };


    loadData();

  }, [id, navigate]);


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
  // UPDATE SEAT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const seatData = {

        seatNumber:
          seat.seatNumber,

        seatType:
          seat.seatType,

        screen: {
          id: Number(seat.screenId)
        }

      };


      await updateSeat(
        id,
        seatData
      );


      alert(
        "Seat updated successfully"
      );


      navigate("/admin/seats");

    } catch (error) {

      console.error(
        "Update Seat Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update seat"
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

        <main className="admin-form-page">

          <h2>
            Loading...
          </h2>

        </main>

        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />

      <main className="admin-form-page">

        <div className="admin-form-card">

          <h1>
            Edit Seat
          </h1>

          <p>
            Update seat details
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
                Update Seat
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


export default EditSeat;