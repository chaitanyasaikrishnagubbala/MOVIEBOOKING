import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
    getShowById,
    updateShow
} from "../../service/showService";

import { getAllMovies } from "../../service/movieService";
import { getAllScreens } from "../../service/screenService";


function EditShow() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [movies, setMovies] = useState([]);
    const [screens, setScreens] = useState([]);

    const [show, setShow] = useState({
        showDate: "",
        showTime: "",
        ticketPrice: "",
        movieId: "",
        screenId: ""
    });


    const [loading, setLoading] = useState(true);


    // =========================
    // LOAD SHOW
    // =========================

    useEffect(() => {

        const loadData = async () => {

            try {

                const showData =
                    await getShowById(id);

                const movieData =
                    await getAllMovies();

                const screenData =
                    await getAllScreens();


                setMovies(movieData);

                setScreens(screenData);


                setShow({

                    showDate:
                        showData.showDate || "",

                    showTime:
                        showData.showTime || "",

                    ticketPrice:
                        showData.ticketPrice || "",

                    movieId:
                        showData.movie?.id || "",

                    screenId:
                        showData.screen?.id || ""
                });


            } catch (error) {

                console.error(
                    "Load Show Error:",
                    error
                );

                alert("Failed to load show");

                navigate("/admin/shows");

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

        setShow({
            ...show,
            [e.target.name]: e.target.value
        });

    };


    // =========================
    // UPDATE SHOW
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const showData = {

                showDate:
                    show.showDate,

                showTime:
                    show.showTime,

                ticketPrice:
                    Number(show.ticketPrice),

                movie: {
                    id: Number(show.movieId)
                },

                screen: {
                    id: Number(show.screenId)
                }
            };


            await updateShow(
                id,
                showData
            );


            alert(
                "Show updated successfully"
            );


            navigate("/admin/shows");


        } catch (error) {

            console.error(
                "Update Show Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update show"
            );
        }
    };


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
                        Edit Show
                    </h1>

                    <p>
                        Update show details
                    </p>


                    <form onSubmit={handleSubmit}>


                        {/* Movie */}

                        <div className="form-group">

                            <label>
                                Movie
                            </label>

                            <select
                                name="movieId"
                                value={show.movieId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Movie
                                </option>

                                {movies.map((movie) => (

                                    <option
                                        key={movie.id}
                                        value={movie.id}
                                    >
                                        {movie.title}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Screen */}

                        <div className="form-group">

                            <label>
                                Screen
                            </label>

                            <select
                                name="screenId"
                                value={show.screenId}
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


                        {/* Date */}

                        <div className="form-group">

                            <label>
                                Show Date
                            </label>

                            <input
                                type="date"
                                name="showDate"
                                value={show.showDate}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Time */}

                        <div className="form-group">

                            <label>
                                Show Time
                            </label>

                            <input
                                type="time"
                                name="showTime"
                                value={show.showTime}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Ticket Price */}

                        <div className="form-group">

                            <label>
                                Ticket Price
                            </label>

                            <input
                                type="number"
                                name="ticketPrice"
                                value={show.ticketPrice}
                                onChange={handleChange}
                                min="0"
                                required
                            />

                        </div>


                        <div className="admin-form-actions">

                            <button
                                type="submit"
                                className="admin-save-button"
                            >
                                Update Show
                            </button>


                            <button
                                type="button"
                                className="admin-cancel-button"
                                onClick={() =>
                                    navigate("/admin/shows")
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


export default EditShow;