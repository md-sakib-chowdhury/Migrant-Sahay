import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav style={{
            background: "#1e3a8a",
            padding: "14px 0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
            <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Link to="/" style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
                    🌍 মাইগ্রেন্ট সহায়
                </Link>
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    {[
                        { to: "/agencies", label: "এজেন্সি" },
                        { to: "/reports", label: "অভিযোগ" },
                        { to: "/forum", label: "ফোরাম" },
                        { to: "/remittance", label: "রেমিট্যান্স" },
                    ].map((link) => (
                        <Link key={link.to} to={link.to} style={{ color: "#cbd5e1", fontSize: 14 }}>
                            {link.label}
                        </Link>
                    ))}
                    {user ? (
                        <>
                            {user.role === "admin" && (
                                <Link to="/admin" style={{ color: "#fbbf24", fontSize: 14, fontWeight: 600 }}>
                                    Admin
                                </Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-sm" style={{ background: "#ef4444", color: "#fff" }}>
                                লগআউট
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: "#cbd5e1", fontSize: 14 }}>লগইন</Link>
                            <Link to="/register" className="btn btn-sm btn-primary">নিবন্ধন</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}