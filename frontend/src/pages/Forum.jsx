import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";

const categories = ["general", "job", "legal", "health", "remittance", "other"];

export default function Forum() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", body: "", category: "general", country: "" });
    const [expanded, setExpanded] = useState(null);
    const [commentText, setCommentText] = useState("");

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const res = await API.get("/posts", { params: { page: p, limit: 8, category } });
            setPosts(res.data.posts);
            setTotal(res.data.total);
            setPages(res.data.pages);
            setPage(p);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, [category]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("লগইন করুন");
        try {
            await API.post("/posts", form);
            toast.success("পোস্ট তৈরি হয়েছে!");
            setShowForm(false);
            setForm({ title: "", body: "", category: "general", country: "" });
            load(1);
        } catch (err) { toast.error(err.response?.data?.message || "ব্যর্থ"); }
    };

    const handleLike = async (id) => {
        if (!user) return toast.error("লগইন করুন");
        try {
            await API.put(`/posts/${id}/like`);
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    const handleComment = async (postId) => {
        if (!user) return toast.error("লগইন করুন");
        if (!commentText.trim()) return;
        try {
            await API.post(`/posts/${postId}/comment`, { text: commentText });
            setCommentText("");
            load(page);
            toast.success("মন্তব্য যোগ হয়েছে");
        } catch { toast.error("ব্যর্থ"); }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>💬 কমিউনিটি ফোরাম ({total})</h1>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "বাতিল" : "+ পোস্ট লিখুন"}
                </button>
            </div>

            {/* Category filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                <button onClick={() => setCategory("")}
                    className="btn btn-sm" style={{ background: !category ? "#2563eb" : "#e5e7eb", color: !category ? "#fff" : "#374151" }}>
                    সব
                </button>
                {categories.map((c) => (
                    <button key={c} onClick={() => setCategory(c)}
                        className="btn btn-sm" style={{ background: category === c ? "#2563eb" : "#e5e7eb", color: category === c ? "#fff" : "#374151" }}>
                        {c}
                    </button>
                ))}
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: 24, borderLeft: "4px solid #2563eb" }}>
                    <h3 style={{ marginBottom: 16, fontWeight: 700 }}>নতুন পোস্ট</h3>
                    <form onSubmit={handleCreate}>
                        <div className="form-group">
                            <label>শিরোনাম *</label>
                            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>বিস্তারিত *</label>
                            <textarea rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div className="form-group">
                                <label>ক্যাটাগরি</label>
                                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>দেশ</label>
                                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                            </div>
                        </div>
                        <button className="btn btn-primary">পোস্ট করুন</button>
                    </form>
                </div>
            )}

            {loading ? <p>লোড হচ্ছে...</p> : (
                <>
                    {posts.map((p) => (
                        <div className="card" key={p._id}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e3a8a" }}>{p.title}</h3>
                                <span className="badge badge-blue">{p.category}</span>
                            </div>
                            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{p.body}</p>
                            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#6b7280", alignItems: "center" }}>
                                <span>👤 {p.user?.name}</span>
                                {p.country && <span>📍 {p.country}</span>}
                                <button onClick={() => handleLike(p._id)}
                                    style={{ background: "none", border: "1.5px solid #d1d5db", padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}>
                                    ❤️ {p.likes.length}
                                </button>
                                <button onClick={() => setExpanded(expanded === p._id ? null : p._id)}
                                    style={{ background: "none", border: "1.5px solid #d1d5db", padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}>
                                    💬 {p.comments.length}
                                </button>
                            </div>
                            {expanded === p._id && (
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
                                    {p.comments.map((c) => (
                                        <div key={c._id} style={{ background: "#f9fafb", padding: 10, borderRadius: 8, marginBottom: 8 }}>
                                            <span style={{ fontWeight: 600, fontSize: 13 }}>{c.user?.name}: </span>
                                            <span style={{ fontSize: 13 }}>{c.text}</span>
                                        </div>
                                    ))}
                                    {user && (
                                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                            <input placeholder="মন্তব্য লিখুন..." value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                style={{ flex: 1, padding: "8px 12px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14 }} />
                                            <button className="btn btn-primary btn-sm" onClick={() => handleComment(p._id)}>পাঠান</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <Pagination page={page} pages={pages} onPageChange={load} />
                </>
            )}
        </div>
    );
}