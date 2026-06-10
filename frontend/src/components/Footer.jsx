export default function Footer() {
    return (
        <footer style={{
            background: "#1e3a8a",
            color: "#cbd5e1",
            marginTop: 60,
            padding: "40px 0 20px",
        }}>
            <div className="container">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 32,
                    marginBottom: 32,
                }}>
                    {/* Brand */}
                    <div>
                        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                            🌍 মাইগ্রেন্ট সহায়
                        </h3>
                        <p style={{ fontSize: 13, lineHeight: 1.8 }}>
                            বাংলাদেশের বিদেশগামী শ্রমিকদের জন্য একটি বিশ্বস্ত তথ্য ও সহায়তা প্ল্যাটফর্ম।
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 12 }}>দ্রুত লিংক</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                            {[
                                { href: "/agencies", label: "এজেন্সি তালিকা" },
                                { href: "/reports", label: "প্রতারণার অভিযোগ" },
                                { href: "/forum", label: "কমিউনিটি ফোরাম" },
                                { href: "/remittance", label: "রেমিট্যান্স ক্যালকুলেটর" },
                            ].map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} style={{ color: "#94a3b8", fontSize: 13, transition: "color 0.2s" }}
                                        onMouseEnter={(e) => e.target.style.color = "#fff"}
                                        onMouseLeave={(e) => e.target.style.color = "#94a3b8"}>
                                        › {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 12 }}>যোগাযোগ</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                            <li>📧 support@migrantsahay.com</li>
                            <li>📞 +880 1700-000000</li>
                            <li>📍 ঢাকা, বাংলাদেশ</li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 12 }}>সহায়তা</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                            <li><a href="/register" style={{ color: "#94a3b8" }}>› নিবন্ধন করুন</a></li>
                            <li><a href="/login" style={{ color: "#94a3b8" }}>› লগইন করুন</a></li>
                            <li><a href="/reports" style={{ color: "#94a3b8" }}>› অভিযোগ করুন</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div style={{
                    borderTop: "1px solid #2d4f9e",
                    paddingTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                    fontSize: 13,
                }}>
                    <p>© {new Date().getFullYear()} মাইগ্রেন্ট সহায়। সর্বস্বত্ব সংরক্ষিত।</p>
                    <p style={{ color: "#64748b" }}>Made with ❤️ for Bangladeshi Workers</p>
                </div>
            </div>
        </footer>
    );
}