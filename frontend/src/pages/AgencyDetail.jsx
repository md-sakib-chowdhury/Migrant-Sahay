import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function AgencyDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [agency, setAgency] = useState(null);
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState({ rating: 5, comment: "" });
    const [submitting, setSubmitting] = useState(false);

    const load = async () => {
        try {
            const res = await API.get(`/agencies/${id}`);
            setAgency(res.data);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, [id]);

    const handleReview = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("লগইন করুন");
        setSubmitting(true);
        try {
            await API.post(`/agencies/${id}/review`, review);
            toast.success("রিভিউ যোগ হয়েছে!");
            setReview({ rating: 5, comment: "" });
            load();
        } catch (err) {
            toast.error(err.response?.data?.message || "ব্যর্থ");
        } finally { setSubmitting(false); }
    };

    if (loading) return <p>লোড হচ্ছে...</p>;
    if (!agency) return <p>পাওয়া যায়নি</p>;

    return (
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e3a8a" }}>{agency.name}</h1>
                        <p style={{ color: "#6b7280", marginTop: 4 }}>📜 লাইসেন্স: {agency.licenseNo}</p>
                    </div>
                    {agency.isVerified && <span className="badge badge-green" style={{ fontSize: 14 }}>✓ ভেরিফাইড</span>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <p>📍 {agency.address}</p>
                    <p>📞 {agency.phone}</p>
                    {agency.email && <p>✉️ {agency.email}</p>}
                    {agency.avgRating > 0 && <p>⭐ {agency.avgRating.toFixed(1)} গড় রেটিং</p>}
                </div>
                {agency.countries.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                        {agency.countries.map((c) => <span key={c} className="badge badge-blue">{c}</span>)}
                    </div>
                )}
                {agency.description && <p style={{ color: "#374151", lineHeight: 1.6 }}>{agency.description}</p>}
            </div>

            {/* Reviews */}
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💬 রিভিউ ({agency.reviews.length})</h2>
            {agency.reviews.length === 0 ? (
                <p style={{ color: "#6b7280", marginBottom: 20 }}>এখনো কোনো রিভিউ নেই।</p>
            ) : (
                agency.reviews.map((r) => (
                    <div className="card" key={r._id} style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontWeight: 600 }}>{r.user?.name}</span>
                            <span style={{ color: "#d97706" }}>{"⭐".repeat(r.rating)}</span>
                        </div>
                        <p style={{ color: "#374151", fontSize: 14 }}>{r.comment}</p>
                    </div>
                ))
            )}

            {/* Add review form */}
            {user && (
                <div className="card">
                    <h3 style={{ marginBottom: 16, fontWeight: 700 }}>রিভিউ দিন</h3>
                    <form onSubmit={handleReview}>
                        <div className="form-group">
                            <label>রেটিং</label>
                            <select value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}>
                                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"⭐".repeat(n)} ({n})</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>মন্তব্য</label>
                            <textarea rows={3} value={review.comment}
                                onChange={(e) => setReview({ ...review, comment: e.target.value })} required />
                        </div>
                        <button className="btn btn-primary" disabled={submitting}>
                            {submitting ? "সাবমিট হচ্ছে..." : "রিভিউ দিন"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}