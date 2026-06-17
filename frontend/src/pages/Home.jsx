
import { Link } from "react-router-dom";

const STATS = [
    { value: "১২,৪৮০+", label: "নিবন্ধিত শ্রমিক" },
    { value: "৩৪৮", label: "যাচাইকৃত এজেন্সি" },
    { value: "২,১৯৩", label: "অভিযোগ নিষ্পত্তি" },
    { value: "৪২টি", label: "গন্তব্য দেশ" },
];

const FEATURES = [
    { icon: "🏢", title: "এজেন্সি যাচাই", desc: "লাইসেন্সপ্রাপ্ত রিক্রুটিং এজেন্সির তালিকা দেখুন, রেটিং ও রিভিউ পড়ুন", to: "/agencies", color: "#2563eb" },
    { icon: "🚨", title: "প্রতারণার অভিযোগ", desc: "অসৎ এজেন্সির বিরুদ্ধে অভিযোগ করুন এবং অন্যদের সতর্ক করুন", to: "/reports", color: "#dc2626" },
    { icon: "💬", title: "কমিউনিটি ফোরাম", desc: "অভিজ্ঞতা শেয়ার করুন, প্রশ্ন করুন, সঠিক পরামর্শ নিন", to: "/forum", color: "#059669" },
    { icon: "💰", title: "রেমিট্যান্স ক্যালকুলেটর", desc: "বিভিন্ন চ্যানেলে টাকা পাঠানোর খরচ ও হার তুলনা করুন", to: "/remittance", color: "#d97706" },
];

const STEPS = [
    { num: "০১", title: "নিবন্ধন করুন", desc: "বিনামূল্যে অ্যাকাউন্ট খুলুন এবং আপনার প্রোফাইল তৈরি করুন" },
    { num: "০২", title: "এজেন্সি যাচাই করুন", desc: "যেকোনো এজেন্সির লাইসেন্স, রেটিং ও অভিযোগের ইতিহাস দেখুন" },
    { num: "০৩", title: "নিরাপদে বিদেশ যান", desc: "সঠিক তথ্য নিয়ে সিদ্ধান্ত নিন এবং প্রতারণা থেকে বাঁচুন" },
];

const ALERTS = [
    { badge: "সতর্কতা", text: "ঢাকার 'গ্লোবাল ট্রেড লিংক' এজেন্সির বিরুদ্ধে ৭টি নতুন অভিযোগ দায়ের হয়েছে", time: "২ ঘণ্টা আগে", color: "#dc2626" },
    { badge: "আপডেট", text: "সৌদি আরবে নতুন ভিসা ক্যাটাগরি চালু — গৃহকর্মী ভিসার আবেদন শুরু হয়েছে", time: "৫ ঘণ্টা আগে", color: "#2563eb" },
    { badge: "সতর্কতা", text: "মালয়েশিয়া যাওয়ার নামে ৩ লক্ষ টাকা প্রতারণার অভিযোগ — চট্টগ্রামের এজেন্সি", time: "১ দিন আগে", color: "#dc2626" },
    { badge: "নোটিশ", text: "বিএমইটি নতুন নিয়ম: সকল এজেন্সিকে অনলাইনে লাইসেন্স নবায়ন করতে হবে", time: "২ দিন আগে", color: "#059669" },
];

export default function Home() {
    return (
        <div style={s.page}>

            {/* ── Hero ── */}
            <div style={s.hero}>
                <div style={s.heroInner}>
                    <div style={s.heroBadge}>🇧🇩 বাংলাদেশের বিদেশগামী শ্রমিকদের জন্য</div>
                    <h1 style={s.heroTitle}>
                        প্রতারণামুক্ত বিদেশযাত্রার<br />
                        <span style={s.heroAccent}>বিশ্বস্ত সঙ্গী</span>
                    </h1>
                    <p style={s.heroSub}>
                        এজেন্সি যাচাই করুন, অভিযোগ করুন, কমিউনিটির সাথে যুক্ত হন —
                        সব এক জায়গায়
                    </p>
                    <div style={s.heroBtns}>
                        <Link to="/agencies" style={s.btnPrimary}>এজেন্সি খুঁজুন →</Link>
                        <Link to="/register" style={s.btnOutline}>বিনামূল্যে নিবন্ধন</Link>
                    </div>
                </div>
                <div style={s.heroVisual}>
                    <div style={s.globeWrap}>
                        <span style={{ fontSize: 90, lineHeight: 1 }}>🌍</span>
                    </div>
                </div>
            </div>

            {/* ── Stats ── */}
            <div style={s.statsRow}>
                {STATS.map((st) => (
                    <div key={st.label} style={s.statCard}>
                        <div style={s.statVal}>{st.value}</div>
                        <div style={s.statLabel}>{st.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Features ── */}
            <div style={s.section}>
                <div style={s.sectionHead}>
                    <span style={s.sectionEyebrow}>আমাদের সেবাসমূহ</span>
                    <h2 style={s.sectionTitle}>যা যা পাবেন এই প্ল্যাটফর্মে</h2>
                </div>
                <div style={s.featGrid}>
                    {FEATURES.map((f) => (
                        <Link to={f.to} key={f.to} style={{ textDecoration: "none" }}>
                            <div
                                style={s.featCard}
                                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                            >
                                <div style={{ ...s.featIconBox, background: f.color + "15", border: `1px solid ${f.color}30` }}>
                                    <span style={{ fontSize: 26 }}>{f.icon}</span>
                                </div>
                                <h3 style={{ ...s.featTitle, color: f.color }}>{f.title}</h3>
                                <p style={s.featDesc}>{f.desc}</p>
                                <span style={{ ...s.featLink, color: f.color }}>বিস্তারিত দেখুন →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ── How it works ── */}
            <div style={s.howSection}>
                <div style={s.sectionHead}>
                    <span style={s.sectionEyebrow}>কীভাবে কাজ করে</span>
                    <h2 style={s.sectionTitle}>মাত্র ৩টি ধাপে শুরু করুন</h2>
                </div>
                <div style={s.stepsRow}>
                    {STEPS.map((st, i) => (
                        <div key={st.num} style={s.stepCard}>
                            <div style={s.stepNum}>{st.num}</div>
                            {i < STEPS.length - 1 && <div style={s.stepLine} />}
                            <h3 style={s.stepTitle}>{st.title}</h3>
                            <p style={s.stepDesc}>{st.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Alerts ── */}
            <div style={s.section}>
                <div style={{ ...s.sectionHead, marginBottom: 20 }}>
                    <span style={s.sectionEyebrow}>সর্বশেষ আপডেট</span>
                    <h2 style={s.sectionTitle}>সাম্প্রতিক সতর্কতা ও নোটিশ</h2>
                </div>
                <div style={s.alertsList}>
                    {ALERTS.map((a, i) => (
                        <div key={i} style={s.alertRow}>
                            <span style={{ ...s.alertBadge, background: a.color + "18", color: a.color, border: `1px solid ${a.color}30` }}>
                                {a.badge}
                            </span>
                            <p style={s.alertText}>{a.text}</p>
                            <span style={s.alertTime}>{a.time}</span>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Link to="/reports" style={s.btnOutlineDark}>সব অভিযোগ দেখুন →</Link>
                </div>
            </div>

            {/* ── CTA Banner ── */}
            <div style={s.ctaBanner}>
                <h2 style={s.ctaTitle}>এখনই শুরু করুন — বিনামূল্যে</h2>
                <p style={s.ctaSub}>হাজারো শ্রমিক ইতিমধ্যে আমাদের সাথে আছেন। আপনিও যোগ দিন।</p>
                <Link to="/register" style={s.btnPrimary}>অ্যাকাউন্ট খুলুন →</Link>
            </div>

        </div>
    );
}

/* ─── Styles ─────────────────────────────────── */
const s = {
    page: {
        fontFamily: "'Hind Siliguri', sans-serif",
        color: "#0f172a",
        maxWidth: "100%",
    },

    /* Hero */
    hero: {
        background: "linear-gradient(135deg, #0f2554 0%, #1e3a8a 60%, #2563eb 100%)",
        borderRadius: 20,
        padding: "60px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
        marginBottom: 32,
        flexWrap: "wrap",
    },
    heroInner: { flex: 1, minWidth: 280 },
    heroBadge: {
        display: "inline-block",
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#bfdbfe",
        fontSize: 12, fontWeight: 600,
        padding: "5px 14px", borderRadius: 20,
        marginBottom: 20, letterSpacing: "0.04em",
    },
    heroTitle: {
        fontSize: "clamp(26px, 4vw, 42px)",
        fontWeight: 800, color: "#fff",
        lineHeight: 1.2, marginBottom: 16,
    },
    heroAccent: { color: "#f59e0b" },
    heroSub: {
        fontSize: 16, color: "#bfdbfe",
        lineHeight: 1.7, marginBottom: 28, maxWidth: 480,
    },
    heroBtns: { display: "flex", gap: 12, flexWrap: "wrap" },
    heroVisual: {
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
    },
    globeWrap: {
        width: 160, height: 160,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
    },

    /* Buttons */
    btnPrimary: {
        background: "#f59e0b", color: "#0f2554",
        fontFamily: "'Hind Siliguri', sans-serif",
        fontSize: 14, fontWeight: 700,
        padding: "11px 24px", borderRadius: 9,
        textDecoration: "none", whiteSpace: "nowrap",
        display: "inline-block",
    },
    btnOutline: {
        background: "rgba(255,255,255,0.1)",
        border: "1.5px solid rgba(255,255,255,0.3)",
        color: "#fff",
        fontFamily: "'Hind Siliguri', sans-serif",
        fontSize: 14, fontWeight: 600,
        padding: "11px 24px", borderRadius: 9,
        textDecoration: "none", whiteSpace: "nowrap",
        display: "inline-block",
    },
    btnOutlineDark: {
        background: "transparent",
        border: "1.5px solid #0f2554",
        color: "#0f2554",
        fontFamily: "'Hind Siliguri', sans-serif",
        fontSize: 14, fontWeight: 600,
        padding: "10px 24px", borderRadius: 9,
        textDecoration: "none", display: "inline-block",
    },

    /* Stats */
    statsRow: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 16, marginBottom: 48,
    },
    statCard: {
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 14, padding: "20px 16px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    },
    statVal: {
        fontSize: 28, fontWeight: 800,
        color: "#0f2554", marginBottom: 4,
    },
    statLabel: { fontSize: 13, color: "#64748b", fontWeight: 500 },

    /* Section */
    section: { marginBottom: 56 },
    sectionHead: { textAlign: "center", marginBottom: 32 },
    sectionEyebrow: {
        display: "inline-block",
        fontSize: 11, fontWeight: 700,
        color: "#2563eb", letterSpacing: "0.12em",
        textTransform: "uppercase",
        background: "#eff6ff",
        padding: "4px 12px", borderRadius: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: "clamp(20px, 3vw, 28px)",
        fontWeight: 800, color: "#0f172a",
    },

    /* Features */
    featGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
    },
    featCard: {
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 16, padding: "28px 24px",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        height: "100%",
    },
    featIconBox: {
        width: 52, height: 52, borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
    },
    featTitle: { fontSize: 16, fontWeight: 700, marginBottom: 8 },
    featDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 16 },
    featLink: { fontSize: 13, fontWeight: 600 },

    /* How it works */
    howSection: {
        background: "#f8fafc",
        borderRadius: 20, padding: "48px 40px",
        marginBottom: 56,
    },
    stepsRow: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 24, position: "relative",
    },
    stepCard: {
        textAlign: "center", padding: "0 16px",
        position: "relative",
    },
    stepNum: {
        fontSize: 36, fontWeight: 900,
        color: "#0f2554", opacity: 0.12,
        lineHeight: 1, marginBottom: 12,
        fontFamily: "monospace",
    },
    stepLine: {
        position: "absolute", top: 20,
        right: "-12px", width: 24, height: 2,
        background: "#cbd5e1",
    },
    stepTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 },
    stepDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.6 },

    /* Alerts */
    alertsList: {
        display: "flex", flexDirection: "column", gap: 12,
    },
    alertRow: {
        display: "flex", alignItems: "flex-start", gap: 14,
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 12, padding: "14px 18px",
        flexWrap: "wrap",
    },
    alertBadge: {
        fontSize: 11, fontWeight: 700,
        padding: "3px 10px", borderRadius: 20,
        whiteSpace: "nowrap", flexShrink: 0,
        marginTop: 2,
    },
    alertText: {
        fontSize: 13.5, color: "#334155",
        lineHeight: 1.5, flex: 1, minWidth: 200,
    },
    alertTime: {
        fontSize: 12, color: "#94a3b8",
        whiteSpace: "nowrap", flexShrink: 0,
        marginTop: 2,
    },

    /* CTA Banner */
    ctaBanner: {
        background: "linear-gradient(135deg, #0f2554 0%, #1e3a8a 100%)",
        borderRadius: 20, padding: "48px 40px",
        textAlign: "center",
    },
    ctaTitle: {
        fontSize: "clamp(20px, 3vw, 30px)",
        fontWeight: 800, color: "#fff", marginBottom: 12,
    },
    ctaSub: {
        fontSize: 15, color: "#bfdbfe",
        marginBottom: 28, lineHeight: 1.6,
    },
};