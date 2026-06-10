import { Link } from "react-router-dom";

const features = [
    { icon: "🏢", title: "এজেন্সি যাচাই", desc: "রিক্রুটিং এজেন্সির তালিকা দেখুন ও রিভিউ দিন", to: "/agencies" },
    { icon: "🚨", title: "প্রতারণার অভিযোগ", desc: "অসৎ এজেন্সির বিরুদ্ধে অভিযোগ করুন", to: "/reports" },
    { icon: "💬", title: "কমিউনিটি ফোরাম", desc: "অভিজ্ঞতা শেয়ার করুন, প্রশ্ন করুন", to: "/forum" },
    { icon: "💰", title: "রেমিট্যান্স ক্যালকুলেটর", desc: "বিদেশ থেকে টাকা পাঠানোর হিসাব করুন", to: "/remittance" },
];

export default function Home() {
    return (
        <div>
            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
                borderRadius: 16,
                padding: "60px 40px",
                textAlign: "center",
                color: "#fff",
                marginBottom: 40,
            }}>
                <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
                    🌍 মাইগ্রেন্ট সহায়
                </h1>
                <p style={{ fontSize: 18, color: "#bfdbfe", maxWidth: 600, margin: "0 auto 28px" }}>
                    বাংলাদেশের বিদেশগামী শ্রমিকদের জন্য একটি বিশ্বস্ত তথ্য ও সহায়তা প্ল্যাটফর্ম
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    <Link to="/agencies" className="btn btn-primary" style={{ background: "#fff", color: "#1e3a8a", fontSize: 15 }}>
                        এজেন্সি দেখুন
                    </Link>
                    <Link to="/register" className="btn" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", fontSize: 15 }}>
                        নিবন্ধন করুন
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
                {features.map((f) => (
                    <Link to={f.to} key={f.to} style={{ textDecoration: "none" }}>
                        <div className="card" style={{ textAlign: "center", cursor: "pointer", transition: "transform 0.2s", borderTop: "3px solid #2563eb" }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                            <div style={{ fontSize: 40, marginBottom: 12 }}>{f.icon}</div>
                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                            <p style={{ fontSize: 13, color: "#6b7280" }}>{f.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}