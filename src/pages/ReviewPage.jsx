import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function StarRating({ value, onChange, readOnly = false }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => !readOnly && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          style={{ fontSize: 28, cursor: readOnly ? "default" : "pointer", color: star <= (hovered || value) ? "#f59e0b" : "#d1d5db", transition: "color 0.15s", userSelect: "none" }}>★</span>
      ))}
      {!readOnly && value > 0 && <span style={{ alignSelf: "center", marginLeft: 6, fontSize: 13, color: "#6b7280" }}>{STAR_LABELS[value]}</span>}
    </div>
  );
}

export default function ReviewPage() {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState(currentUser?.displayName || "");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [publicReviews, setPublicReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    async function fetchPublicReviews() {
      try {
        const q = query(collection(db, "reviews"), where("rating", ">=", 2), orderBy("rating", "desc"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setPublicReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e); } finally { setLoadingReviews(false); }
    }
    fetchPublicReviews();
  }, [success]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) { setError("Please select a star rating."); return; }
    if (!comment.trim()) { setError("Please write a short comment."); return; }
    if (!name.trim()) { setError("Please enter your name."); return; }
    setError(""); setSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), { name: name.trim(), rating, comment: comment.trim(), isPositive: rating >= 2, uid: currentUser?.uid || null, createdAt: serverTimestamp() });
      setSuccess(true); setRating(0); setComment("");
    } catch (err) { setError("Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", padding: "40px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f3638", marginBottom: 4 }}>Patient Reviews</h1>
        <p style={{ color: "#6b7280", marginBottom: 32, fontSize: 15 }}>Share your experience — your feedback helps us improve.</p>
        <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0f3638", marginBottom: 20 }}>Leave a Review</h2>
          {success ? (
            <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 20, textAlign: "center", color: "#065f46" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>Thank you for your feedback!</p>
              <button onClick={() => setSuccess(false)} style={{ marginTop: 12, background: "#01696f", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 14 }}>Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Your Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jane Mwangi" required style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Rating</label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Your Experience</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us about your visit..." rows={4} required style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              {error && <p style={{ color: "#dc2626", fontSize: 13, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={submitting} style={{ background: submitting ? "#9ca3af" : "#01696f", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer", alignSelf: "flex-start" }}>
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f3638", marginBottom: 16 }}>What Our Patients Say</h2>
        {loadingReviews ? <p style={{ color: "#9ca3af" }}>Loading reviews...</p> : publicReviews.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, textAlign: "center", color: "#9ca3af", border: "1px dashed #e5e7eb" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>💬</p><p>No reviews yet. Be the first!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {publicReviews.map((r) => {
              const date = r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" }) : "Recently";
              return (
                <div key={r.id} style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #f3f4f6" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#cedcd8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#01696f" }}>{r.name?.charAt(0).toUpperCase() || "P"}</div>
                      <div><p style={{ fontWeight: 600, margin: 0, fontSize: 14 }}>{r.name}</p><p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>{date}</p></div>
                    </div>
                    <StarRating value={r.rating} readOnly />
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>{r.comment}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
