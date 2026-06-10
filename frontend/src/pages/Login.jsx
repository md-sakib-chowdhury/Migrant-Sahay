import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form);
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "লগইন ব্যর্থ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 420, margin: "60px auto" }}>
            <div className="card">
                <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 700, textAlign: "center" }}>🔐 লগইন</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>ইমেইল</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>পাসওয়ার্ড</label>
                        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    </div>
                    <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
                        {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
                    </button>
                </form>
                <p style={{ marginTop: 16, textAlign: "center", fontSize: 14, color: "#6b7280" }}>
                    একাউন্ট নেই? <Link to="/register" style={{ color: "#2563eb" }}>নিবন্ধন করুন</Link>
                </p>
            </div>
        </div>
    );
}