import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", country: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(form);
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "নিবন্ধন ব্যর্থ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 460, margin: "60px auto" }}>
            <div className="card">
                <h2 style={{ marginBottom: 24, fontSize: 22, fontWeight: 700, textAlign: "center" }}>📝 নিবন্ধন</h2>
                <form onSubmit={handleSubmit}>
                    {[
                        ["name", "পূর্ণ নাম", "text"],
                        ["email", "ইমেইল", "email"],
                        ["password", "পাসওয়ার্ড", "password"],
                        ["phone", "ফোন নম্বর", "text"],
                        ["country", "আপনি কোন দেশে আছেন?", "text"],
                    ].map(([key, label, type]) => (
                        <div className="form-group" key={key}>
                            <label>{label}</label>
                            <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                required={["name", "email", "password"].includes(key)} />
                        </div>
                    ))}
                    <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
                        {loading ? "হচ্ছে..." : "নিবন্ধন করুন"}
                    </button>
                </form>
                <p style={{ marginTop: 16, textAlign: "center", fontSize: 14, color: "#6b7280" }}>
                    একাউন্ট আছে? <Link to="/login" style={{ color: "#2563eb" }}>লগইন করুন</Link>
                </p>
            </div>
        </div>
    );
}