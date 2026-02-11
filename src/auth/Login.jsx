import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
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
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const token = res.data.token || res.data.accessToken;

      if (!token) {
        setError("Token not received from server");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Admin Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button 
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export const logout = () => {
  localStorage.clear();
  window.location.href = "/auth/login";
};