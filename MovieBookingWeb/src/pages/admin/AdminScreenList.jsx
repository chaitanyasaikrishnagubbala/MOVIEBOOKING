import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
    getAllScreens,
    deleteScreen
} from "../../service/screenService";

function AdminScreenList() {

    const [screens, setScreens] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // =========================
    // GET ALL SCREENS
    // =========================

    const fetchScreens = async () => {

        try {

            const data = await getAllScreens();

            setScreens(data);

        } catch (error) {

            console.error(
                "Error fetching screens:",
                error
            );

            alert("Failed to load screens");

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchScreens();

    }, []);


    // =========================
    // DELETE SCREEN
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this screen?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await deleteScreen(id);

            alert("Screen deleted successfully");

            fetchScreens();

        } catch (error) {

            console.error(
                "Error deleting screen:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete screen"
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

                <main className="admin-page">

                    <div className="admin-page-header">

                        <div>

                            <h1>
                                Manage Screens
                            </h1>

                            <p>
                                Loading screens...
                            </p>

                        </div>

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

                {/* PAGE HEADER */}

                <div className="admin-page-header">

                    <div>

                        <h1>
                            Manage Screens
                        </h1>

                        <p>
                            Add, update and delete theater screens
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/admin/screens/add")
                        }
                        className="admin-add-button"
                    >
                        + Add Screen
                    </button>

                </div>


                {/* EMPTY STATE */}

                {screens.length === 0 ? (

                    <div className="empty-state">

                        <h2>
                            No Screens Found
                        </h2>

                        <p>
                            Add your first screen.
                        </p>

                    </div>

                ) : (

                    /* SCREEN TABLE */

                    <div className="admin-table-container">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Screen Name
                                    </th>

                                    <th>
                                        Theater
                                    </th>

                                    <th>
                                        City
                                    </th>

                                    <th>
                                        Total Seats
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {screens.map((screen) => (

                                    <tr key={screen.id}>

                                        <td>
                                            {screen.id}
                                        </td>

                                        <td>
                                            {screen.name}
                                        </td>

                                        <td>
                                            {screen.theater?.name || "N/A"}
                                        </td>

                                        <td>
                                            {screen.theater?.city || "N/A"}
                                        </td>

                                        <td>
                                            {screen.totalSeats}
                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="admin-table-actions">

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/screens/edit/${screen.id}`
                                                        )
                                                    }
                                                    className="admin-edit-button"
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            screen.id
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

export default AdminScreenList;