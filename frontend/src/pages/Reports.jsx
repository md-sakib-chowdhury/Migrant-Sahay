import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

const statusColors = { pending: "badge-yellow", investigating: "badge-blue", resolved: "badge-green", rejected: "badge-red" };

export default function Reports() {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ agencyName: "", description: "", amount: "", country: "" });
    const [submitting, setSubmitting] = useState(false);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const res = await API.get("/reports", { params: { page: p, limit: 10 } });
            setReports(res.data.reports);
            setTotal(res.data.total);
            setPages(res.data.pages);
            setPage(p);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("লগইন করুন");
        setSubmitting(true);
        try {
            await API.post("/reports", form);
            toast.success("অভিযোগ দাখিল হয়েছে!");
            setShowForm(false);
            setForm({ agencyName: "", description: "", amount: "", country: "" });
            load(1);
        } catch (err) {
            toast.error(err.response?.data?.message || "ব্যর্থ");
        } finally { setSubmitting(false); }
    };

    const handleUpvote = async (id) => {
        if (!user) return toast.error("লগইন করুন");
        try {
            await API.put(`/reports/${id}/upvote`);
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>🚨 প্রতারণার অভিযোগ ({total})</h1>
                <button className="btn btn-danger" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "বাতিল করুন" : "+ অভিযোগ করুন"}
                </button>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: 24, borderLeft: "4px solid #dc2626" }}>
                    <h3 style={{ marginBottom: 16, fontWeight: 700 }}>অভিযোগ দাখিল</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div className="form-group">
                                <label>এজেন্সির নাম *</label>
                                <input value={form.agencyName} onChange={(e) => setForm({ ...form, agencyName: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>দেশ</label>
                                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>প্রতারিত পরিমাণ (টাকা)</label>
                                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>বিস্তারিত বিবরণ *</label>
                            <textarea rows={4} value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                        </div>
                        <button className="btn btn-danger" disabled={submitting}>
                            {submitting ? "দাখিল হচ্ছে..." : "অভিযোগ দাখিল করুন"}
                        </button>
                    </form>
                </div>
            )}

            {loading ? <p>লোড হচ্ছে...</p> : (
                <>
                    {reports.map((r) => (
                        <div className="card" key={r._id} style={{ borderLeft: "4px solid #dc2626" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{r.agencyName}</h3>
                                <span className={`badge ${statusColors[r.status]}`}>{r.status}</span>
                            </div>
                            <p style={{ color: "#374151", fontSize: 14, marginBottom: 10, lineHeight: 1.6 }}>{r.description}</p>
                            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#6b7280", alignItems: "center" }}>
                                {r.amount && <span>💰 ৳{r.amount}</span>}
                                {r.country && <span>📍 {r.country}</span>}
                                <span>👤 {r.user?.name}</span>
                                <button onClick={() => handleUpvote(r._id)}
                                    style={{ marginLeft: "auto", background: "none", border: "1.5px solid #d1d5db", padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}>
                                    👍 {r.upvotes.length}
                                </button>
                            </div>
                        </div>
                    ))}
                    <Pagination page={page} pages={pages} onPageChange={load} />
                </>
            )}
        </div>
    );
}