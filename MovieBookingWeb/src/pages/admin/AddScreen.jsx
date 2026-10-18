import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { addScreen } from "../../service/screenService";
import { getAllTheaters } from "../../service/theaterService";

function AddScreen() {

    const navigate = useNavigate();

    const [theaters, setTheaters] = useState([]);

    const [screen, setScreen] = useState({
        name: "",
        totalSeats: "",
        theaterId: ""
    });

    const [loading, setLoading] = useState(false);


    // Load theaters
    useEffect(() => {

        const fetchTheaters = async () => {

            try {

                const data = await getAllTheaters();

                setTheaters(data);

            } catch (error) {

                console.error(
                    "Error fetching theaters:",
                    error
                );

                alert("Failed to load theaters");
            }
        };

        fetchTheaters();

    }, []);


    const handleChange = (e) => {

        setScreen({
            ...screen,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!screen.theaterId) {

            alert("Please select a theater");

            return;
        }


        try {

            setLoading(true);

            const screenData = {

                name: screen.name,

                totalSeats: Number(
                    screen.totalSeats
                ),

                theater: {
                    id: Number(
                        screen.theaterId
                    )
                }
            };


            await addScreen(screenData);

            alert(
                "Screen added successfully"
            );

            navigate("/admin/screens");

        } catch (error) {

            console.error(
                "Error adding screen:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to add screen"
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <>
            <Navbar />

            <main className="admin-form-page">

                <div className="admin-form-card">

                    <h1>
                        Add Screen
                    </h1>

                    <p>
                        Add a new screen to a theater
                    </p>


                    <form onSubmit={handleSubmit}>


                        {/* Theater */}

                        <div className="form-group">

                            <label>
                                Theater
                            </label>

                            <select
                                name="theaterId"
                                value={screen.theaterId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Theater
                                </option>

                                {theaters.map((theater) => (

                                    <option
                                        key={theater.id}
                                        value={theater.id}
                                    >
                                        {theater.name}
                                        {theater.city
                                            ? ` - ${theater.city}`
                                            : ""}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Screen Name */}

                        <div className="form-group">

                            <label>
                                Screen Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Example: Screen 1"
                                value={screen.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Total Seats */}

                        <div className="form-group">

                            <label>
                                Total Seats
                            </label>

                            <input
                                type="number"
                                name="totalSeats"
                                placeholder="Example: 120"
                                min="1"
                                value={screen.totalSeats}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Buttons */}

                        <div className="form-actions">

                            <button
                                type="submit"
                                disabled={loading}
                                className="admin-save-button"
                            >
                                {loading
                                    ? "Adding..."
                                    : "Add Screen"}
                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/admin/screens")
                                }
                                className="admin-cancel-button"
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

export default AddScreen;