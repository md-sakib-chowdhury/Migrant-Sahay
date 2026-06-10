import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
    { to: "/admin", label: "📊 ড্যাশবোর্ড", end: true },
    { to: "/admin/users", label: "👥 ইউজার ম্যানেজ" },
    { to: "/admin/agencies", label: "🏢 এজেন্সি ম্যানেজ" },
    { to: "/admin/reports", label: "🚨 অভিযোগ ম্যানেজ" },
    { to: "/admin/posts", label: "💬 পোস্ট ম্যানেজ" },
    { to: "/admin/jobs", label: "💼 চাকরি তথ্য" },
];

export default function AdminSidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <aside style={{
            width: 240,
            background: "#1e3a8a",
            minHeight: "100vh",
            padding: "24px 0",
            display: "flex",
            flexDirection: "column",
        }}>
            <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #2d4f9e" }}>
                <h2 style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>🛡️ Admin Panel</h2>
                <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>মাইগ্রেন্ট সহায়</p>
            </div>
            <nav style={{ flex: 1, padding: "16px 0" }}>
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end}
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 20px",
                            color: isActive ? "#fbbf24" : "#cbd5e1",
                            background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                            fontSize: 14,
                            fontWeight: isActive ? 600 : 400,
                            borderLeft: isActive ? "3px solid #fbbf24" : "3px solid transparent",
                            transition: "all 0.2s",
                        })}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #2d4f9e" }}>
                <button
                    onClick={() => { logout(); navigate("/"); }}
                    className="btn btn-sm btn-danger"
                    style={{ width: "100%" }}
                >
                    লগআউট
                </button>
            </div>
        </aside>
    );
}