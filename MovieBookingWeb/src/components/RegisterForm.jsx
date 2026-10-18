import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../service/authService";

function RegisterForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await register(user);

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert("Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-page">

      <div className="register-card">

        <div className="register-header">
          <h1>Create Account</h1>

          <p>
            Create your account and start booking movies
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >

          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">
              Email
            </label>

            <input
              id="register-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">
              Password
            </label>

            <input
              id="register-password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>

      </div>

    </section>
  );
}

export default RegisterForm;