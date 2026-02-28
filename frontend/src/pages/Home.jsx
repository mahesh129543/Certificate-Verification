import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CertificateTemplate from "../components/CertificateTemplate";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [id, setId] = useState("");
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const certificateRef = useRef();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8000/api/auth/me", {
          headers: { "x-auth-token": token },
        });
        setUserData(res.data);
      } catch (err) {}
    };
    fetchUserData();
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("🔒 Please Login or Register to verify certificates.");
      navigate("/login");
      return;
    }

    if (!id) return;
    setError("");
    setCertificateData(null);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/certificates/verify/${id}`
      );
      setCertificateData(res.data);
      setTimeout(() => {
        document
          .getElementById("result-section")
          .scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setError("❌ Certificate not found. Please check the ID.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!token) {
      alert("🔒 Please login to download.");
      navigate("/login");
      return;
    }

    const input = certificateRef.current;
    if (!input) return;

    setLoading(true);
    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
      pdf.save(`Certificate_${id}.pdf`);
    } catch {
      alert("Download failed.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
           Certi<span style={{ color: "#2563eb" }}>va</span>
        </div>

        <div style={styles.navLinks}>
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                style={styles.outlineBtn}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                style={styles.primaryBtn}
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              {role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  style={styles.outlineBtn}
                >
                  Dashboard
                </button>
              )}

              {userData && (
                <div
                  onClick={() => setShowProfile(!showProfile)}
                  style={styles.profileBadge}
                >
                  👤 {userData.name}
                </div>
              )}

              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <header style={styles.hero}>
        <div style={styles.heroGlow}></div>

        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Verify Certificates Instantly with Certiva
          </h1>

          <p style={styles.heroSubtitle}>
            Trusted verification platform for internships and certifications.
            Secure, fast and professional.
          </p>

          <form onSubmit={handleSearch} style={styles.searchBox}>
            <input
              type="text"
              placeholder="Enter Certificate ID (CERT101)"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchBtn}>
              Verify Now
            </button>
          </form>

          {error && <div style={styles.error}>{error}</div>}
        </div>
      </header>

      {/* RESULT */}
     {/* RESULT */}
{certificateData && (
  <section id="result-section" style={styles.result}>
    <h2 style={styles.sectionTitle}>Verification Successful 🎉</h2>

    {/* CENTER WRAPPER */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={styles.certWrap}>
        <CertificateTemplate ref={certificateRef} data={certificateData} />
      </div>

      {/* BUTTON BELOW CERTIFICATE */}
      <button
        onClick={handleDownloadPDF}
        disabled={loading}
        style={{
          ...styles.downloadBtn,
          marginTop: "20px", // little space
        }}
      >
        {loading ? "Generating PDF..." : "Download PDF"}
      </button>
    </div>
  </section>
)}

      {/* FEATURES */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose Certiva?</h2>

        <div style={styles.grid}>
          {[
            ["⚡", "Instant Verification", "Verify certificates in seconds."],
            ["🔒", "Secure System", "Encrypted and tamper-proof validation."],
            ["📄", "Easy Downloads", "Download high quality PDFs anytime."],
          ].map(([icon, title, desc], i) => (
            <div key={i} style={styles.card}>
              <div style={styles.icon}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        © 2026 Certiva. All rights reserved.
      </footer>
    </div>
  );
};

const styles = {
  page: { fontFamily: "Inter, sans-serif", background: "#f8fafc" },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 60px",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: { fontSize: "26px", fontWeight: 800 },

  navLinks: { display: "flex", gap: "12px", alignItems: "center" },

  outlineBtn: {
    padding: "8px 16px",
    border: "1.5px solid #2563eb",
    borderRadius: "8px",
    background: "transparent",
    color: "#2563eb",
    fontWeight: 600,
    cursor: "pointer",
  },

  primaryBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },

  profileBadge: {
    background: "#e0ecff",
    padding: "8px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: 600,
  },

  hero: {
    padding: "110px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
    color: "#fff",
    position: "relative",
  },

  heroGlow: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(255,255,255,0.2)",
    filter: "blur(90px)",
    top: 0,
    left: "20%",
  },

  heroContent: { maxWidth: "760px", margin: "0 auto", position: "relative" },

  heroTitle: { fontSize: "52px", fontWeight: 800 },

  heroSubtitle: { margin: "18px 0 35px", fontSize: "18px", opacity: 0.9 },

  searchBox: {
    display: "flex",
    background: "#fff",
    padding: "8px",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
  },

  searchInput: {
    flex: 1,
    border: "none",
    padding: "14px",
    fontSize: "16px",
    outline: "none",
  },

  searchBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontWeight: 700,
    cursor: "pointer",
  },

  error: {
    marginTop: "15px",
    background: "#fee2e2",
    color: "#dc2626",
    padding: "10px",
    borderRadius: "8px",
    display: "inline-block",
  },

  result: { padding: "70px 20px", textAlign: "center", background: "#fff" },

  sectionTitle: { fontSize: "34px", fontWeight: 800 },

  certWrap: {
    marginTop: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
    display: "inline-block",
  },

  downloadBtn: {
    marginTop: "25px",
    padding: "14px 26px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  features: { padding: "90px 50px", textAlign: "center" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "24px",
    marginTop: "30px",
  },

  card: {
    background: "#fff",
    padding: "28px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  },

  icon: { fontSize: "36px", marginBottom: "10px" },

  footer: {
    background: "#111827",
    color: "#fff",
    textAlign: "center",
    padding: "25px",
    marginTop: "40px",
  },
};

export default LandingPage;