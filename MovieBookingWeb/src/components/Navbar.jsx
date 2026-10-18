import { NavLink, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Navbar() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        MovieBooking
      </Link>


      {/* Navigation */}
      <div className="navbar-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>


        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Movies
        </NavLink>


        {token && (
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Bookings
          </NavLink>
        )}


        {/* Admin link */}
        {role === "ROLE_ADMIN" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Admin
          </NavLink>
        )}

      </div>


      {/* Login / Register / Logout */}
      <div className="navbar-actions">

        {!token ? (
          <>
            <Link
              to="/login"
              className="login-nav-button"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-nav-button"
            >
              Register
            </Link>
          </>
        ) : (
          <LogoutButton />
        )}

      </div>

    </nav>
  );
}

export default Navbar;