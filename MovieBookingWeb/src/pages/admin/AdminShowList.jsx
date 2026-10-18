import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
    getAllShows,
    deleteShow
} from "../../service/showService";


function AdminShowList() {

    const [shows, setShows] = useState([]);

    const [loading, setLoading] = useState(true);


    // =========================
    // GET ALL SHOWS
    // =========================

    const fetchShows = async () => {

        try {

            setLoading(true);

            const data = await getAllShows();

            setShows(data);

        } catch (error) {

            console.error(
                "Error fetching shows:",
                error
            );

            alert("Failed to load shows");

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchShows();

    }, []);


    // =========================
    // DELETE SHOW
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this show?"
            );

        if (!confirmDelete) {
            return;
        }


        try {

            await deleteShow(id);

            alert(
                "Show deleted successfully"
            );

            fetchShows();

        } catch (error) {

            console.error(
                "Error deleting show:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete show"
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
                        Loading shows...
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
                            Manage Shows
                        </h1>

                        <p>
                            Add, update and delete movie shows
                        </p>
                    </div>


                    <Link
                        to="/admin/shows/add"
                        className="admin-add-button"
                    >
                        + Add Show
                    </Link>

                </div>


                {shows.length === 0 ? (

                    <div className="empty-state">

                        <h2>
                            No Shows Found
                        </h2>

                        <p>
                            Add a show to get started.
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
                                        Movie
                                    </th>

                                    <th>
                                        Screen
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Time
                                    </th>

                                    <th>
                                        Ticket Price
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {shows.map((show) => (

                                    <tr key={show.id}>

                                        <td>
                                            {show.id}
                                        </td>


                                        <td>
                                            {show.movie?.title ||
                                                "N/A"}
                                        </td>


                                        <td>
                                            {show.screen?.name ||
                                                "N/A"}
                                        </td>


                                        <td>
                                            {show.showDate ||
                                                "N/A"}
                                        </td>


                                        <td>
                                            {show.showTime ||
                                                "N/A"}
                                        </td>


                                        <td>
                                            ₹{show.ticketPrice}
                                        </td>


                                        <td>

                                            <div className="admin-actions">

                                                <Link
                                                    to={`/admin/shows/edit/${show.id}`}
                                                    className="admin-edit-button"
                                                >
                                                    Edit
                                                </Link>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            show.id
                                                        )
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


export default AdminShowList;