import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [certificates, setCertificates] = useState([]);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const fetchCertificates = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/certificates", {
        headers: { "x-auth-token": token },
      });
      setCertificates(res.data);
    } catch (err) {
      console.error("Error fetching certificates");
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/certificates/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );

      setMessage(res.data.message);
      fetchCertificates();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error uploading file");
    }
  };

  return (
    <div style={styles.page}>
      {/* ===== NAVBAR ===== */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>⚙️ Certiva Admin Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.container}>
        {/* ===== DASHBOARD STATS ===== */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3 style={{ margin: 0 }}>📊 Total Certificates</h3>
            <p style={styles.statNumber}>{certificates.length}</p>
          </div>
        </div>

        {/* ===== UPLOAD CARD ===== */}
        <div style={styles.card}>
          <h3>📄 Upload Student Data</h3>
          <p style={styles.desc}>
            Upload Excel (.xlsx/.xls) file containing certificate data.
          </p>

          <form onSubmit={handleUpload} style={styles.form}>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              style={styles.fileInput}
            />

            <button type="submit" style={styles.uploadBtn}>
              Upload Data
            </button>
          </form>

          {message && (
            <div
              style={{
                ...styles.message,
                background: message.includes("Error")
                  ? "#fee2e2"
                  : "#dcfce7",
                color: message.includes("Error")
                  ? "#dc2626"
                  : "#16a34a",
              }}
            >
              {message}
            </div>
          )}
        </div>

        {/* ===== DATA TABLE ===== */}
        <div style={styles.tableCard}>
          <h3>📋 Uploaded Certificates</h3>

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Certificate ID</th>
                  <th>Student Name</th>
                  <th>Domain</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>

              <tbody>
                {certificates.length > 0 ? (
                  certificates.map((cert, index) => (
                    <tr key={index} style={styles.row}>
                      <td>{cert.certificateId}</td>
                      <td>{cert.studentName}</td>
                      <td>{cert.internshipDomain}</td>
                      <td>{cert.startDate}</td>
                      <td>{cert.endDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                      No data uploaded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== STYLES ===== */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    fontFamily: "Inter, sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px 40px",
    background: "#fff",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },

  title: { margin: 0, fontWeight: "700" },

  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  container: {
    padding: "30px",
    display: "grid",
    gap: "25px",
  },

  /* STATS */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  statCard: {
    background: "#2563eb",
    color: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
  },

  statNumber: {
    fontSize: "36px",
    fontWeight: "800",
    margin: "10px 0 0",
  },

  /* UPLOAD CARD */
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
  },

  desc: { color: "#6b7280", fontSize: "14px" },

  form: { display: "flex", flexDirection: "column", gap: "12px" },

  fileInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },

  uploadBtn: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },

  message: {
    marginTop: "12px",
    padding: "10px",
    borderRadius: "8px",
    fontWeight: "600",
  },

  /* TABLE */
  tableCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },

  row: {
    borderBottom: "1px solid #e5e7eb",
  },
};

export default AdminDashboard;