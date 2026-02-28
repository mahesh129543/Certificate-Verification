import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url =
      formData.role === "admin"
        ? "http://localhost:8000/api/auth/admin/login"
        : "http://localhost:8000/api/auth/user/login";

    try {
      const res = await axios.post(url, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful!");

      if (formData.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
      }}
    >
      {/* ================= LEFT SIDE ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
          color: "white",
        }}
      >
        {/* Glow effects */}
        <div
          style={{
            position: "absolute",
            width: "320px",
            height: "320px",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "50%",
            top: "-80px",
            left: "-80px",
            filter: "blur(70px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "260px",
            height: "260px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            bottom: "-70px",
            right: "-70px",
            filter: "blur(70px)",
          }}
        />

        <div style={{ zIndex: 2, maxWidth: "430px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "800",
              marginBottom: "12px",
              lineHeight: "1.2",
            }}
          >
            Certiva
          </h1>

          <p
            style={{
              fontSize: "18px",
              opacity: 0.9,
              lineHeight: "1.6",
              marginBottom: "28px",
            }}
          >
            Smart & Secure Certificate Verification Platform for students,
            admins and institutions.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "✔ Instant Certificate Verification",
              "✔ Secure Role-Based Access",
              "✔ Modern Dashboard Experience",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  backdropFilter: "blur(6px)",
                  fontSize: "15px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#fff",
            borderRadius: "18px",
            padding: "36px 30px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "6px",
            }}
          >
            Login Account
          </h2>

          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "22px",
            }}
          >
            Enter your credentials to continue
          </p>

          {error && (
            <p
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                marginBottom: "14px",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <label style={{ fontSize: "14px", fontWeight: "600" }}>
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
              }}
            >
              <option value="user">Student</option>
              <option value="admin">Admin</option>
            </select>

            <label style={{ fontSize: "14px", fontWeight: "600" }}>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
              }}
            />

            <label style={{ fontSize: "14px", fontWeight: "600" }}>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
              }}
            />

            <button
              type="submit"
              style={{
                marginTop: "8px",
                padding: "12px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.target.style.background = "#2563eb")
              }
            >
              Login
            </button>
          </form>

          <p
            style={{
              marginTop: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#2563eb",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;