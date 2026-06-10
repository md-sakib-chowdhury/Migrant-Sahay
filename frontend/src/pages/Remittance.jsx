import { useEffect, useState } from "react";
import API from "../api/axios";

const RATES = {
    "Saudi Arabia": 28.5, "UAE": 29.2, "Qatar": 29.8, "Kuwait": 354.0,
    "Bahrain": 286.0, "Oman": 280.0, "Malaysia": 23.5, "Singapore": 80.0,
    "South Korea": 0.082, "Italy": 118.0, "UK": 135.0, "USA": 110.0,
};

export default function Remittance() {
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("Saudi Arabia");
    const [result, setResult] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        API.get("/jobs").then((res) => setJobs(res.data)).catch(console.error);
    }, []);

    const calculate = () => {
        if (!amount || isNaN(amount)) return;
        const rate = RATES[from] || 110;
        const bdt = parseFloat(amount) * rate;
        const charge = bdt * 0.015;
        setResult({ bdt: bdt.toFixed(2), charge: charge.toFixed(2), net: (bdt - charge).toFixed(2), rate });
    };

    const countryJobs = jobs.filter((j) => j.country === selectedCountry);

    return (
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {/* Calculator */}
            <div className="card" style={{ marginBottom: 24, borderTop: "4px solid #2563eb" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>💰 রেমিট্যান্স ক্যালকুলেটর</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div className="form-group">
                        <label>পরিমাণ</label>
                        <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>যে দেশ থেকে পাঠাচ্ছেন</label>
                        <select value={from} onChange={(e) => setFrom(e.target.value)}>
                            {Object.keys(RATES).map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={calculate}>হিসাব করুন</button>

                {result && (
                    <div style={{ marginTop: 20, background: "#f0f9ff", borderRadius: 12, padding: 20 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {[
                                ["বিনিময় হার", `১ = ৳${result.rate}`],
                                ["মোট (BDT)", `৳${parseFloat(result.bdt).toLocaleString()}`],
                                ["চার্জ (1.5%)", `৳${parseFloat(result.charge).toLocaleString()}`],
                                ["নেট পরিমাণ", `৳${parseFloat(result.net).toLocaleString()}`],
                            ].map(([label, val]) => (
                                <div key={label} style={{ textAlign: "center", padding: 12, background: "#fff", borderRadius: 8 }}>
                                    <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{label}</p>
                                    <p style={{ fontWeight: 700, fontSize: 18, color: "#1e3a8a" }}>{val}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Job Info */}
            <div className="card">
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>💼 দেশভিত্তিক চাকরি তথ্য</h2>
                <div className="form-group">
                    <label>দেশ বেছে নিন</label>
                    <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                        <option value="">— দেশ বেছে নিন —</option>
                        {[...new Set(jobs.map((j) => j.country))].map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                {countryJobs.length > 0 ? (
                    countryJobs.map((j) => (
                        <div key={j._id} className="card" style={{ background: "#f9fafb" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                <h4 style={{ fontWeight: 700 }}>{j.jobTitle}</h4>
                                <span className="badge badge-blue">{j.category}</span>
                            </div>
                            <p style={{ fontSize: 14, color: "#16a34a", fontWeight: 600 }}>
                                💰 {j.minSalary}–{j.maxSalary} {j.currency}/মাস
                            </p>
                            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>🕐 {j.workingHours} · 📋 {j.visaType}</p>
                            {j.benefits.length > 0 && (
                                <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                                    {j.benefits.map((b, i) => <span key={i} className="badge badge-green">{b}</span>)}
                                </div>
                            )}
                        </div>
                    ))
                ) : selectedCountry ? (
                    <p style={{ color: "#6b7280" }}>এই দেশের জন্য কোনো তথ্য নেই।</p>
                ) : null}
            </div>
        </div>
    );
}