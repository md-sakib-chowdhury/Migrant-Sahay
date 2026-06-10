import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Pagination from "../components/Pagination";

export default function Agencies() {
    const [agencies, setAgencies] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [verified, setVerified] = useState("");
    const [loading, setLoading] = useState(true);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const res = await API.get("/agencies", { params: { page: p, limit: 9, search, verified } });
            setAgencies(res.data.agencies);
            setTotal(res.data.total);
            setPages(res.data.pages);
            setPage(p);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, [verified]);

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>🏢 রিক্রুটিং এজেন্সি ({total})</h1>
            <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                <input placeholder="এজেন্সি নাম খুঁজুন..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && load(1)}
                    style={{ flex: 1, minWidth: 200, padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14 }} />
                <select value={verified} onChange={(e) => setVerified(e.target.value)}
                    style={{ padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14 }}>
                    <option value="">সব এজেন্সি</option>
                    <option value="true">ভেরিফাইড</option>
                </select>
                <button className="btn btn-primary" onClick={() => load(1)}>খুঁজুন</button>
            </div>

            {loading ? <p>লোড হচ্ছে...</p> : (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                        {agencies.map((a) => (
                            <Link to={`/agencies/${a._id}`} key={a._id} style={{ textDecoration: "none" }}>
                                <div className="card" style={{ cursor: "pointer", borderLeft: `4px solid ${a.isVerified ? "#16a34a" : "#d1d5db"}` }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e3a8a" }}>{a.name}</h3>
                                        {a.isVerified && <span className="badge badge-green">✓ ভেরিফাইড</span>}
                                    </div>
                                    <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>📜 লাইসেন্স: {a.licenseNo}</p>
                                    <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>📍 {a.address}</p>
                                    {a.countries.length > 0 && (
                                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                                            {a.countries.map((c) => (
                                                <span key={c} className="badge badge-blue">{c}</span>
                                            ))}
                                        </div>
                                    )}
                                    {a.avgRating > 0 && (
                                        <p style={{ marginTop: 8, fontSize: 13, color: "#d97706" }}>
                                            ⭐ {a.avgRating.toFixed(1)} ({a.reviews.length} রিভিউ)
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Pagination page={page} pages={pages} onPageChange={load} />
                </>
            )}
        </div>
    );
}