import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
    getScreenById,
    updateScreen
} from "../../service/screenService";

import {
    getAllTheaters
} from "../../service/theaterService";


function EditScreen() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [theaters, setTheaters] = useState([]);

    const [screen, setScreen] = useState({
        name: "",
        totalSeats: "",
        theaterId: ""
    });

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    // =========================
    // LOAD SCREEN + THEATERS
    // =========================

    useEffect(() => {

        const fetchData = async () => {

            try {

                const screenData =
                    await getScreenById(id);

                const theaterData =
                    await getAllTheaters();


                setTheaters(theaterData);


                setScreen({
                    name: screenData.name || "",

                    totalSeats:
                        screenData.totalSeats || "",

                    theaterId:
                        screenData.theater?.id || ""
                });


            } catch (error) {

                console.error(
                    "Error loading screen:",
                    error
                );

                alert("Failed to load screen");

            } finally {

                setLoading(false);
            }
        };


        fetchData();

    }, [id]);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        setScreen({
            ...screen,
            [e.target.name]: e.target.value
        });

    };


    // =========================
    // UPDATE SCREEN
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!screen.theaterId) {

            alert("Please select a theater");

            return;
        }


        try {

            setSaving(true);


            const screenData = {

                name: screen.name,

                totalSeats:
                    Number(screen.totalSeats),

                theater: {
                    id:
                        Number(screen.theaterId)
                }
            };


            await updateScreen(
                id,
                screenData
            );


            alert(
                "Screen updated successfully"
            );


            navigate("/admin/screens");


        } catch (error) {

            console.error(
                "Error updating screen:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update screen"
            );

        } finally {

            setSaving(false);
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
                        Loading screen...
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

            <main className="admin-form-page">

                <div className="admin-form-card">

                    <h1>
                        Edit Screen
                    </h1>

                    <p>
                        Update screen information
                    </p>


                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* THEATER */}

                        <div className="form-group">

                            <label>
                                Theater
                            </label>

                            <select
                                name="theaterId"
                                value={
                                    screen.theaterId
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select Theater
                                </option>


                                {theaters.map(
                                    (theater) => (

                                        <option
                                            key={
                                                theater.id
                                            }
                                            value={
                                                theater.id
                                            }
                                        >

                                            {theater.name}

                                            {theater.city
                                                ? ` - ${theater.city}`
                                                : ""}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* SCREEN NAME */}

                        <div className="form-group">

                            <label>
                                Screen Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    screen.name
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* TOTAL SEATS */}

                        <div className="form-group">

                            <label>
                                Total Seats
                            </label>

                            <input
                                type="number"
                                name="totalSeats"
                                min="1"
                                value={
                                    screen.totalSeats
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* BUTTONS */}

                        <div className="form-actions">

                            <button
                                type="submit"
                                disabled={saving}
                                className="admin-save-button"
                            >

                                {saving
                                    ? "Updating..."
                                    : "Update Screen"}

                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/admin/screens"
                                    )
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


export default EditScreen;