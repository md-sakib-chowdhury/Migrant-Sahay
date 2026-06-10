import { useEffect, useState } from "react";
import { fetchStats } from "../../api/adminApi";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats()
            .then((res) => setStats(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>লোড হচ্ছে...</p>;

    const cards = [
        { label: "মোট ইউজার", value: stats.users, color: "#2563eb" },
        { label: "মোট এজেন্সি", value: stats.agencies, color: "#7c3aed" },
        { label: "ভেরিফাইড এজেন্সি", value: stats.verifiedAgencies, color: "#059669" },
        { label: "মোট অভিযোগ", value: stats.reports, color: "#dc2626" },
        { label: "পেন্ডিং অভিযোগ", value: stats.pendingReports, color: "#d97706" },
        { label: "ফোরাম পোস্ট", value: stats.posts, color: "#0891b2" },
        { label: "চাকরি তথ্য", value: stats.jobs, color: "#65a30d" },
    ];

    return (
        <div>
            <h1 style={{ marginBottom: 24, fontSize: 24, fontWeight: 700 }}>📊 ড্যাশবোর্ড</h1>
            <div className="stats-grid">
                {cards.map((c) => (
                    <div className="stat-card" key={c.label}>
                        <h3 style={{ color: c.color }}>{c.value}</h3>
                        <p>{c.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}