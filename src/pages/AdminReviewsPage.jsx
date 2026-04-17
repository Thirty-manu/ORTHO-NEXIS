import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TABS = [{ key: "all", label: "All Reviews" }, { key: "negative", label: "⚠️ Needs Attention" }, { key: "positive", label: "✅ Positive" }];

export default function AdminReviewsPage() {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { if (userRole && userRole !== "admin") navigate("/"); }, [userRole, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, "reviews"), orderBy("createdAt", "desc")));
        setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this review?")) return;
    setDeleting(id);
    try { await deleteDoc(doc(db, "reviews", id)); setReviews((p) => p.filter((r) => r.id !== id)); }
    catch (e) { alert("Failed to delete."); } finally { setDeleting(null); }
  }

  const filtered = reviews.filter((r) => activeTab === "negative" ? !r.isPositive : activeTab === "positive" ? r.isPositive : true);
  const negCount = reviews.filter((r) => !r.isPositive).length;
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "—";

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", padding: "32px 16px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f3638", margin: 0 }}>Patient Reviews — Admin View</h1>
        <p style={{ color: "#6b7280", margin: "4px 0 24px", fontSize: 14 }}>Negative reviews (1–3★) are hidden from patients.</p>
        <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
          {[{ label: "Total", value: reviews.length, color: "#01696f" }, { label: "Avg Rating", value: avgRating + " ★", color: "#f59e0b" }, { label: "Positive ≥4★", value: reviews.filter(r => r.isPositive).length, color: "#16a34a" }, { label: "Needs Attention", value: negCount, color: "#dc2626" }].map((s) => (
            <div key={s.label} style={{ flex: "1 1 140px", background: "#fff", borderRadius: 12, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p style={{ margin: 0, fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>{s.label}</p>
              <p style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#e5e7eb", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: "8px 18px", borderRadius: 7, border: "none", background: activeTab === t.key ? "#fff" : "transparent", color: activeTab === t.key ? "#0f3638" : "#6b7280", fontWeight: activeTab === t.key ? 600 : 400, cursor: "pointer", fontSize: 13 }}>
              {t.label}{t.key === "negative" && negCount > 0 && <span style={{ marginLeft: 6, background: "#fee2e2", color: "#dc2626", borderRadius: 99, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{negCount}</span>}
            </button>
          ))}
        </div>
        {loading ? <p style={{ color: "#9ca3af" }}>Loading...</p> : filtered.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 12, padding: 40, textAlign: "center", color: "#9ca3af" }}>
            <p style={{ fontSize: 32 }}>{activeTab === "negative" ? "🎉" : "💬"}</p>
            <p>{activeTab === "negative" ? "No negative reviews!" : "No reviews here yet."}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map((r) => {
              const isNeg = !r.isPositive;
              const date = r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Unknown";
              return (
                <div key={r.id} style={{ background: "#fff", border: `1px solid ${isNeg ? "#fecaca" : "#d1fae5"}`, borderLeft: `4px solid ${isNeg ? "#dc2626" : "#16a34a"}`, borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: isNeg ? "#fee2e2" : "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: isNeg ? "#dc2626" : "#16a34a" }}>{r.name?.charAt(0).toUpperCase() || "P"}</div>
                      <div><p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{r.name}</p><p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>{date}</p></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#f59e0b", fontSize: 15 }}>{"★".repeat(r.rating)}<span style={{ color: "#d1d5db" }}>{"★".repeat(5 - r.rating)}</span></span>
                      <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, fontWeight: 600, background: isNeg ? "#fee2e2" : "#dcfce7", color: isNeg ? "#dc2626" : "#16a34a" }}>{isNeg ? "Admin Only" : "Public"}</span>
                      <button onClick={() => handleDelete(r.id)} disabled={deleting === r.id} style={{ background: "none", border: "1px solid #fca5a5", borderRadius: 6, color: "#dc2626", padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>{deleting === r.id ? "..." : "Delete"}</button>
                    </div>
                  </div>
                  <p style={{ margin: "14px 0 0", fontSize: 14, color: "#374151", lineHeight: 1.65 }}>{r.comment}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
