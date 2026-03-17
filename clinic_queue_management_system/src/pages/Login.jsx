import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import HealthCheck from "../components/HealthCheck";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      login(res.data.user);

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "patient") navigate("/patient/dashboard");
      else if (role === "receptionist") navigate("/receptionist/dashboard");
      else if (role === "doctor") navigate("/doctor/dashboard");
    } catch (err) {
      alert("Invalid Login");
    }
  };

  return (
    <div className="login-container">
      {/* Inline CSS Styles */}
      <style>
        {`
          .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f4f4f9;
            font-family: Arial, sans-serif;
          }

          .login-card {
            background-color: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
          }

          .login-title {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 30px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            color: #34495e;
          }

          .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #bdc3c7;
            border-radius: 6px;
            font-size: 16px;
          }

          .login-button {
            width: 100%;
            padding: 12px;
            background-color: #3498db;
            color: white;
            font-weight: bold;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          }

          .login-button:hover {
            background-color: #2980b9;
          }

          .healthcheck-container {
            margin-top: 20px;
            text-align: center;
          }
        `}
      </style>

      <div className="login-card">
        <h1 className="login-title">Clinic Queue Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="healthcheck-container">
          <HealthCheck />
        </div>
      </div>
    </div>
  );
}