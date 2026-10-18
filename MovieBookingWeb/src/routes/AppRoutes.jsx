import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import Shows from "../pages/Show";
import SeatSelection from "../pages/SeatSelection";
import MyBookings from "../pages/MyBookings";
import BookingDetails from "../pages/BookingDetails";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AdminMovies from "../pages/admin/AdminMovies";
import AdminTheaterList from "../pages/admin/AdminTheaterList";
import AddTheater from "../pages/admin/AddTheater";
import EditTheater from "../pages/admin/EditTheater";
import AdminScreenList from "../pages/admin/AdminScreenList";
import AddScreen from "../pages/admin/AddScreen";
import EditScreen from "../pages/admin/EditScreen";
import AdminShowList from "../pages/admin/AdminShowList";
import AddShow from "../pages/admin/AddShow";
import EditShow from "../pages/admin/EditShow";
import AdminSeatList from "../pages/admin/AdminSeatList";
import AddSeat from "../pages/admin/AddSeat";
import EditSeat from "../pages/admin/EditSeat";
import AdminUserList from "../pages/admin/AdminUserList";
import AdminBookingList from "../pages/admin/AdminBookingList";
import AdminTransactionList from "../pages/admin/AdminTransactionList";
function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shows/:movieId"
        element={
          <ProtectedRoute>
            <Shows />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seats/:showId/:screenId"
        element={
          <ProtectedRoute>
            <SeatSelection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/:bookingId"
        element={
          <ProtectedRoute>
            <BookingDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<NotFound />}
      />
      <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/movies"
      element={
        <AdminRoute>
          <AdminMovies />
        </AdminRoute>
      }
    />
            <Route
        path="/admin/theaters"
        element={
          <AdminRoute>
            <AdminTheaterList />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/theaters/add"
        element={
          <AdminRoute>
            <AddTheater />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/theaters/edit/:id"
        element={
          <AdminRoute>
            <EditTheater />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/screens"
        element={
            <ProtectedRoute>
                <AdminScreenList />
            </ProtectedRoute>
        }
    />
        <Route
        path="/admin/screens/add"
        element={
            <AdminRoute>
                <AddScreen />
            </AdminRoute>
        }
    />
    <Route
        path="/admin/screens/edit/:id"
        element={
            <AdminRoute>
                <EditScreen />
            </AdminRoute>
        }
    />
    <Route
          path="/admin/shows"
          element={
              <AdminRoute>
                  <AdminShowList />
              </AdminRoute>
          }
      />
      <Route
    path="/admin/shows/add"
    element={
        <AdminRoute>
            <AddShow />
            </AdminRoute>
        }
    />

    <Route
        path="/admin/shows/edit/:id"
        element={
            <AdminRoute>
                <EditShow />
            </AdminRoute>
        }
    />
        <Route
      path="/admin/seats"
      element={
        <AdminRoute>
          <AdminSeatList />
        </AdminRoute>
      }
    />
    <Route
  path="/admin/seats/add"
  element={
    <AdminRoute>
      <AddSeat />
    </AdminRoute>
      }
    />

    <Route
      path="/admin/seats/edit/:id"
      element={
        <AdminRoute>
          <EditSeat />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <AdminRoute>
          <AdminUserList />
        </AdminRoute>
      }
    />
     <Route
      path="/admin/bookings"
      element={
        <AdminRoute>
         <AdminBookingList />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/transactions"
      element={
        <AdminRoute>
        <AdminTransactionList />
        </AdminRoute>
      }
    />
    
    </Routes>
    
  );
}

export default AppRoutes;