// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Theme from "../../styles/Theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendURL}/api/admin/login`, { email, password });
      localStorage.setItem("token", response.data.token);

      if (response.data.token) {
        navigate("/admin/dashboard");
      } else {
        setError("Unauthorized Access");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: Theme.colors.base }}
    >
      <div
        className="p-8 rounded-2xl shadow-lg max-w-md w-full"
        style={{ backgroundColor: Theme.colors.surface }}
      >
        <h2
          className="text-3xl font-semibold text-center mb-4"
          style={{ color: Theme.colors.primary }}
        >
          Admin Login
        </h2>

        {error && (
          <p
            className="text-sm text-center mt-2"
            style={{ color: "red" }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg outline-none"
              style={{
                backgroundColor: Theme.colors.overlay,
                color: Theme.colors.text,
                border: `1px solid ${Theme.colors.border}`,
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg outline-none"
              style={{
                backgroundColor: Theme.colors.overlay,
                color: Theme.colors.text,
                border: `1px solid ${Theme.colors.border}`,
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full font-semibold py-3 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: Theme.colors.primary,
              color: "#fff",
              boxShadow: Theme.shadows.glowPrimary,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
