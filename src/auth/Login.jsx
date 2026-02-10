import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      // IMPORTANT: console log once
      console.log("LOGIN RESPONSE:", res.data);

      // adjust key if backend returns different name
      const token = res.data.token || res.data.accessToken;

      if (!token) {
        alert("Token not received from server");
        return;
      }

      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Admin Login</h4>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export const logout = () => {
  localStorage.clear();
  window.location.href = "/auth/login";
};