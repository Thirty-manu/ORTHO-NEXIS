import ReviewPage from "./pages/ReviewPage";
import AdminReviewsPage from "./pages/AdminReviewsPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Navbar() {
  const { currentUser, userRole, logout } = useAuth();
  return (
    <nav style={{ background: "#01696f", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" style={{ color: "#fff", fontWeight: 700, fontSize: 18, textDecoration: "none" }}>Orthonexis</Link>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Link to="/reviews" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Reviews</Link>
        {userRole === "admin" && (
          <Link to="/admin/reviews" style={{ color: "#fde68a", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Admin Reviews</Link>
        )}
        {currentUser && (
          <button onClick={logout} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div style={{ padding: 40, textAlign: "center" }}><h1>Welcome to Orthonexis</h1></div>} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
