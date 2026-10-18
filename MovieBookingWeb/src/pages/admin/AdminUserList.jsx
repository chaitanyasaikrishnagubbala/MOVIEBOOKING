import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  getAllUsers,
  deleteUser
} from "../../service/userService";


function AdminUserList() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================
  // GET ALL USERS
  // =========================

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const data = await getAllUsers();

      setUsers(data);

    } catch (error) {

      console.error(
        "Get Users Error:",
        error
      );

      alert("Failed to load users");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchUsers();

  }, []);


  // =========================
  // DELETE USER
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      await deleteUser(id);

      alert(
        "User deleted successfully"
      );

      fetchUsers();

    } catch (error) {

      console.error(
        "Delete User Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete user"
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
            Loading users...
          </h2>

        </main>

        <Footer />
      </>
    );
  }


  return (
    <>
      <Navbar />

      <main className="admin-list-page">

        <div className="admin-list-header">

          <div>

            <h1>
              Manage Users
            </h1>

            <p>
              View and manage registered users
            </p>

          </div>

        </div>


        {users.length === 0 ? (

          <div className="empty-state">

            <h2>
              No Users Found
            </h2>

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
                    Username
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>
                      {user.id}
                    </td>

                    <td>
                      {user.username}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      {user.role}
                    </td>

                    <td>

                      <div className="admin-actions">

                        <button
                          className="admin-delete-button"
                          onClick={() =>
                            handleDelete(user.id)
                          }
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


export default AdminUserList;