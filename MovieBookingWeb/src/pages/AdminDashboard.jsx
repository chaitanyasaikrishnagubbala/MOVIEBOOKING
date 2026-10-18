import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <main className="admin-dashboard">

        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your MovieBooking application</p>
        </div>

        <div className="admin-grid">

          <Link to="/admin/movies" className="admin-card">
            <h2>Movies</h2>
            <p>Add, update and delete movies</p>
          </Link>

          <Link to="/admin/theaters" className="admin-card">
            <h2>Theaters</h2>
            <p>Manage theaters</p>
          </Link>

          <Link to="/admin/screens" className="admin-card">
            <h2>Screens</h2>
            <p>Manage theater screens</p>
          </Link>

          <Link to="/admin/shows" className="admin-card">
            <h2>Shows</h2>
            <p>Manage movie shows</p>
          </Link>

          <Link to="/admin/seats" className="admin-card">
            <h2>Seats</h2>
            <p>Manage screen seats</p>
          </Link>

          <Link to="/admin/users" className="admin-card">
            <h2>Users</h2>
            <p>Manage registered users</p>
          </Link>

          <Link to="/admin/bookings" className="admin-card">
            <h2>Bookings</h2>
            <p>View and manage bookings</p>
          </Link>

          <Link to="/admin/transactions" className="admin-card">
            <h2>Transactions</h2>
            <p>View payment transactions</p>
          </Link>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default AdminDashboard;