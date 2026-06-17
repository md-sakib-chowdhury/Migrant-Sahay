
// import { Link } from "react-router-dom";

// const STATS = [
//     { value: "১২,৪৮০+", label: "নিবন্ধিত শ্রমিক" },
//     { value: "৩৪৮", label: "যাচাইকৃত এজেন্সি" },
//     { value: "২,১৯৩", label: "অভিযোগ নিষ্পত্তি" },
//     { value: "৪২টি", label: "গন্তব্য দেশ" },
// ];

// const FEATURES = [
//     { icon: "🏢", title: "এজেন্সি যাচাই", desc: "লাইসেন্সপ্রাপ্ত রিক্রুটিং এজেন্সির তালিকা দেখুন, রেটিং ও রিভিউ পড়ুন", to: "/agencies", color: "#2563eb" },
//     { icon: "🚨", title: "প্রতারণার অভিযোগ", desc: "অসৎ এজেন্সির বিরুদ্ধে অভিযোগ করুন এবং অন্যদের সতর্ক করুন", to: "/reports", color: "#dc2626" },
//     { icon: "💬", title: "কমিউনিটি ফোরাম", desc: "অভিজ্ঞতা শেয়ার করুন, প্রশ্ন করুন, সঠিক পরামর্শ নিন", to: "/forum", color: "#059669" },
//     { icon: "💰", title: "রেমিট্যান্স ক্যালকুলেটর", desc: "বিভিন্ন চ্যানেলে টাকা পাঠানোর খরচ ও হার তুলনা করুন", to: "/remittance", color: "#d97706" },
// ];

// const STEPS = [
//     { num: "০১", title: "নিবন্ধন করুন", desc: "বিনামূল্যে অ্যাকাউন্ট খুলুন এবং আপনার প্রোফাইল তৈরি করুন" },
//     { num: "০২", title: "এজেন্সি যাচাই করুন", desc: "যেকোনো এজেন্সির লাইসেন্স, রেটিং ও অভিযোগের ইতিহাস দেখুন" },
//     { num: "০৩", title: "নিরাপদে বিদেশ যান", desc: "সঠিক তথ্য নিয়ে সিদ্ধান্ত নিন এবং প্রতারণা থেকে বাঁচুন" },
// ];

// const ALERTS = [
//     { badge: "সতর্কতা", text: "ঢাকার 'গ্লোবাল ট্রেড লিংক' এজেন্সির বিরুদ্ধে ৭টি নতুন অভিযোগ দায়ের হয়েছে", time: "২ ঘণ্টা আগে", color: "#dc2626" },
//     { badge: "আপডেট", text: "সৌদি আরবে নতুন ভিসা ক্যাটাগরি চালু — গৃহকর্মী ভিসার আবেদন শুরু হয়েছে", time: "৫ ঘণ্টা আগে", color: "#2563eb" },
//     { badge: "সতর্কতা", text: "মালয়েশিয়া যাওয়ার নামে ৩ লক্ষ টাকা প্রতারণার অভিযোগ — চট্টগ্রামের এজেন্সি", time: "১ দিন আগে", color: "#dc2626" },
//     { badge: "নোটিশ", text: "বিএমইটি নতুন নিয়ম: সকল এজেন্সিকে অনলাইনে লাইসেন্স নবায়ন করতে হবে", time: "২ দিন আগে", color: "#059669" },
// ];

// export default function Home() {
//     return (
//         <div style={s.page}>

//             {/* ── Hero ── */}
//             <div style={s.hero}>
//                 <div style={s.heroInner}>
//                     <div style={s.heroBadge}>🇧🇩 বাংলাদেশের বিদেশগামী শ্রমিকদের জন্য</div>
//                     <h1 style={s.heroTitle}>
//                         প্রতারণামুক্ত বিদেশযাত্রার<br />
//                         <span style={s.heroAccent}>বিশ্বস্ত সঙ্গী</span>
//                     </h1>
//                     <p style={s.heroSub}>
//                         এজেন্সি যাচাই করুন, অভিযোগ করুন, কমিউনিটির সাথে যুক্ত হন —
//                         সব এক জায়গায়
//                     </p>
//                     <div style={s.heroBtns}>
//                         <Link to="/agencies" style={s.btnPrimary}>এজেন্সি খুঁজুন →</Link>
//                         <Link to="/register" style={s.btnOutline}>বিনামূল্যে নিবন্ধন</Link>
//                     </div>
//                 </div>
//                 <div style={s.heroVisual}>
//                     <div style={s.globeWrap}>
//                         <span style={{ fontSize: 90, lineHeight: 1 }}>🌍</span>
//                     </div>
//                 </div>
//             </div>

//             {/* ── Stats ── */}
//             <div style={s.statsRow}>
//                 {STATS.map((st) => (
//                     <div key={st.label} style={s.statCard}>
//                         <div style={s.statVal}>{st.value}</div>
//                         <div style={s.statLabel}>{st.label}</div>
//                     </div>
//                 ))}
//             </div>

//             {/* ── Features ── */}
//             <div style={s.section}>
//                 <div style={s.sectionHead}>
//                     <span style={s.sectionEyebrow}>আমাদের সেবাসমূহ</span>
//                     <h2 style={s.sectionTitle}>যা যা পাবেন এই প্ল্যাটফর্মে</h2>
//                 </div>
//                 <div style={s.featGrid}>
//                     {FEATURES.map((f) => (
//                         <Link to={f.to} key={f.to} style={{ textDecoration: "none" }}>
//                             <div
//                                 style={s.featCard}
//                                 onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
//                                 onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
//                             >
//                                 <div style={{ ...s.featIconBox, background: f.color + "15", border: `1px solid ${f.color}30` }}>
//                                     <span style={{ fontSize: 26 }}>{f.icon}</span>
//                                 </div>
//                                 <h3 style={{ ...s.featTitle, color: f.color }}>{f.title}</h3>
//                                 <p style={s.featDesc}>{f.desc}</p>
//                                 <span style={{ ...s.featLink, color: f.color }}>বিস্তারিত দেখুন →</span>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>

//             {/* ── How it works ── */}
//             <div style={s.howSection}>
//                 <div style={s.sectionHead}>
//                     <span style={s.sectionEyebrow}>কীভাবে কাজ করে</span>
//                     <h2 style={s.sectionTitle}>মাত্র ৩টি ধাপে শুরু করুন</h2>
//                 </div>
//                 <div style={s.stepsRow}>
//                     {STEPS.map((st, i) => (
//                         <div key={st.num} style={s.stepCard}>
//                             <div style={s.stepNum}>{st.num}</div>
//                             {i < STEPS.length - 1 && <div style={s.stepLine} />}
//                             <h3 style={s.stepTitle}>{st.title}</h3>
//                             <p style={s.stepDesc}>{st.desc}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* ── Alerts ── */}
//             <div style={s.section}>
//                 <div style={{ ...s.sectionHead, marginBottom: 20 }}>
//                     <span style={s.sectionEyebrow}>সর্বশেষ আপডেট</span>
//                     <h2 style={s.sectionTitle}>সাম্প্রতিক সতর্কতা ও নোটিশ</h2>
//                 </div>
//                 <div style={s.alertsList}>
//                     {ALERTS.map((a, i) => (
//                         <div key={i} style={s.alertRow}>
//                             <span style={{ ...s.alertBadge, background: a.color + "18", color: a.color, border: `1px solid ${a.color}30` }}>
//                                 {a.badge}
//                             </span>
//                             <p style={s.alertText}>{a.text}</p>
//                             <span style={s.alertTime}>{a.time}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <div style={{ textAlign: "center", marginTop: 20 }}>
//                     <Link to="/reports" style={s.btnOutlineDark}>সব অভিযোগ দেখুন →</Link>
//                 </div>
//             </div>

//             {/* ── CTA Banner ── */}
//             <div style={s.ctaBanner}>
//                 <h2 style={s.ctaTitle}>এখনই শুরু করুন — বিনামূল্যে</h2>
//                 <p style={s.ctaSub}>হাজারো শ্রমিক ইতিমধ্যে আমাদের সাথে আছেন। আপনিও যোগ দিন।</p>
//                 <Link to="/register" style={s.btnPrimary}>অ্যাকাউন্ট খুলুন →</Link>
//             </div>

//         </div>
//     );
// }

// /* ─── Styles ─────────────────────────────────── */
// const s = {
//     page: {
//         fontFamily: "'Hind Siliguri', sans-serif",
//         color: "#0f172a",
//         maxWidth: "100%",
//     },

//     /* Hero */
//     hero: {
//         background: "linear-gradient(135deg, #0f2554 0%, #1e3a8a 60%, #2563eb 100%)",
//         borderRadius: 20,
//         padding: "60px 48px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: 40,
//         marginBottom: 32,
//         flexWrap: "wrap",
//     },
//     heroInner: { flex: 1, minWidth: 280 },
//     heroBadge: {
//         display: "inline-block",
//         background: "rgba(255,255,255,0.12)",
//         border: "1px solid rgba(255,255,255,0.2)",
//         color: "#bfdbfe",
//         fontSize: 12, fontWeight: 600,
//         padding: "5px 14px", borderRadius: 20,
//         marginBottom: 20, letterSpacing: "0.04em",
//     },
//     heroTitle: {
//         fontSize: "clamp(26px, 4vw, 42px)",
//         fontWeight: 800, color: "#fff",
//         lineHeight: 1.2, marginBottom: 16,
//     },
//     heroAccent: { color: "#f59e0b" },
//     heroSub: {
//         fontSize: 16, color: "#bfdbfe",
//         lineHeight: 1.7, marginBottom: 28, maxWidth: 480,
//     },
//     heroBtns: { display: "flex", gap: 12, flexWrap: "wrap" },
//     heroVisual: {
//         display: "flex", alignItems: "center", justifyContent: "center",
//         flexShrink: 0,
//     },
//     globeWrap: {
//         width: 160, height: 160,
//         background: "rgba(255,255,255,0.06)",
//         border: "1px solid rgba(255,255,255,0.12)",
//         borderRadius: "50%",
//         display: "flex", alignItems: "center", justifyContent: "center",
//     },

//     /* Buttons */
//     btnPrimary: {
//         background: "#f59e0b", color: "#0f2554",
//         fontFamily: "'Hind Siliguri', sans-serif",
//         fontSize: 14, fontWeight: 700,
//         padding: "11px 24px", borderRadius: 9,
//         textDecoration: "none", whiteSpace: "nowrap",
//         display: "inline-block",
//     },
//     btnOutline: {
//         background: "rgba(255,255,255,0.1)",
//         border: "1.5px solid rgba(255,255,255,0.3)",
//         color: "#fff",
//         fontFamily: "'Hind Siliguri', sans-serif",
//         fontSize: 14, fontWeight: 600,
//         padding: "11px 24px", borderRadius: 9,
//         textDecoration: "none", whiteSpace: "nowrap",
//         display: "inline-block",
//     },
//     btnOutlineDark: {
//         background: "transparent",
//         border: "1.5px solid #0f2554",
//         color: "#0f2554",
//         fontFamily: "'Hind Siliguri', sans-serif",
//         fontSize: 14, fontWeight: 600,
//         padding: "10px 24px", borderRadius: 9,
//         textDecoration: "none", display: "inline-block",
//     },

//     /* Stats */
//     statsRow: {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//         gap: 16, marginBottom: 48,
//     },
//     statCard: {
//         background: "#fff",
//         border: "1px solid #e2e8f0",
//         borderRadius: 14, padding: "20px 16px",
//         textAlign: "center",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//     },
//     statVal: {
//         fontSize: 28, fontWeight: 800,
//         color: "#0f2554", marginBottom: 4,
//     },
//     statLabel: { fontSize: 13, color: "#64748b", fontWeight: 500 },

//     /* Section */
//     section: { marginBottom: 56 },
//     sectionHead: { textAlign: "center", marginBottom: 32 },
//     sectionEyebrow: {
//         display: "inline-block",
//         fontSize: 11, fontWeight: 700,
//         color: "#2563eb", letterSpacing: "0.12em",
//         textTransform: "uppercase",
//         background: "#eff6ff",
//         padding: "4px 12px", borderRadius: 20,
//         marginBottom: 10,
//     },
//     sectionTitle: {
//         fontSize: "clamp(20px, 3vw, 28px)",
//         fontWeight: 800, color: "#0f172a",
//     },

//     /* Features */
//     featGrid: {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//         gap: 20,
//     },
//     featCard: {
//         background: "#fff",
//         border: "1px solid #e2e8f0",
//         borderRadius: 16, padding: "28px 24px",
//         transition: "transform 0.2s, box-shadow 0.2s",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
//         height: "100%",
//     },
//     featIconBox: {
//         width: 52, height: 52, borderRadius: 12,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         marginBottom: 16,
//     },
//     featTitle: { fontSize: 16, fontWeight: 700, marginBottom: 8 },
//     featDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 16 },
//     featLink: { fontSize: 13, fontWeight: 600 },

//     /* How it works */
//     howSection: {
//         background: "#f8fafc",
//         borderRadius: 20, padding: "48px 40px",
//         marginBottom: 56,
//     },
//     stepsRow: {
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//         gap: 24, position: "relative",
//     },
//     stepCard: {
//         textAlign: "center", padding: "0 16px",
//         position: "relative",
//     },
//     stepNum: {
//         fontSize: 36, fontWeight: 900,
//         color: "#0f2554", opacity: 0.12,
//         lineHeight: 1, marginBottom: 12,
//         fontFamily: "monospace",
//     },
//     stepLine: {
//         position: "absolute", top: 20,
//         right: "-12px", width: 24, height: 2,
//         background: "#cbd5e1",
//     },
//     stepTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 },
//     stepDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.6 },

//     /* Alerts */
//     alertsList: {
//         display: "flex", flexDirection: "column", gap: 12,
//     },
//     alertRow: {
//         display: "flex", alignItems: "flex-start", gap: 14,
//         background: "#fff",
//         border: "1px solid #e2e8f0",
//         borderRadius: 12, padding: "14px 18px",
//         flexWrap: "wrap",
//     },
//     alertBadge: {
//         fontSize: 11, fontWeight: 700,
//         padding: "3px 10px", borderRadius: 20,
//         whiteSpace: "nowrap", flexShrink: 0,
//         marginTop: 2,
//     },
//     alertText: {
//         fontSize: 13.5, color: "#334155",
//         lineHeight: 1.5, flex: 1, minWidth: 200,
//     },
//     alertTime: {
//         fontSize: 12, color: "#94a3b8",
//         whiteSpace: "nowrap", flexShrink: 0,
//         marginTop: 2,
//     },

//     /* CTA Banner */
//     ctaBanner: {
//         background: "linear-gradient(135deg, #0f2554 0%, #1e3a8a 100%)",
//         borderRadius: 20, padding: "48px 40px",
//         textAlign: "center",
//     },
//     ctaTitle: {
//         fontSize: "clamp(20px, 3vw, 30px)",
//         fontWeight: 800, color: "#fff", marginBottom: 12,
//     },
//     ctaSub: {
//         fontSize: 15, color: "#bfdbfe",
//         marginBottom: 28, lineHeight: 1.6,
//     },
// };
import { Link } from "react-router-dom";
import { Fragment } from "react";

const STATS = [
    { value: "১২,৪৮০+", label: "নিবন্ধিত শ্রমিক" },
    { value: "৩৪৮", label: "যাচাইকৃত এজেন্সি" },
    { value: "২,১৯৩", label: "অভিযোগ নিষ্পত্তি" },
    { value: "৪২টি", label: "গন্তব্য দেশ" },
];

const FEATURES = [
    { icon: "🏢", tag: "০১", title: "এজেন্সি যাচাই", desc: "লাইসেন্সপ্রাপ্ত রিক্রুটিং এজেন্সির তালিকা দেখুন, রেটিং ও রিভিউ পড়ুন", to: "/agencies", color: "#C8973B" },
    { icon: "🚨", tag: "০২", title: "প্রতারণার অভিযোগ", desc: "অসৎ এজেন্সির বিরুদ্ধে অভিযোগ করুন এবং অন্যদের সতর্ক করুন", to: "/reports", color: "#8C2F2A" },
    { icon: "💬", tag: "০৩", title: "কমিউনিটি ফোরাম", desc: "অভিজ্ঞতা শেয়ার করুন, প্রশ্ন করুন, সঠিক পরামর্শ নিন", to: "/forum", color: "#3E5C6B" },
    { icon: "💰", tag: "০৪", title: "রেমিট্যান্স ক্যালকুলেটর", desc: "বিভিন্ন চ্যানেলে টাকা পাঠানোর খরচ ও হার তুলনা করুন", to: "/remittance", color: "#2F6F62" },
];

const STEPS = [
    { num: "০১", title: "নিবন্ধন করুন", desc: "বিনামূল্যে অ্যাকাউন্ট খুলুন এবং আপনার প্রোফাইল তৈরি করুন" },
    { num: "০২", title: "এজেন্সি যাচাই করুন", desc: "যেকোনো এজেন্সির লাইসেন্স, রেটিং ও অভিযোগের ইতিহাস দেখুন" },
    { num: "০৩", title: "নিরাপদে বিদেশ যান", desc: "সঠিক তথ্য নিয়ে সিদ্ধান্ত নিন এবং প্রতারণা থেকে বাঁচুন" },
];

const ALERTS = [
    { badge: "সতর্কতা", text: "ঢাকার 'গ্লোবাল ট্রেড লিংক' এজেন্সির বিরুদ্ধে ৭টি নতুন অভিযোগ দায়ের হয়েছে", time: "২ ঘণ্টা আগে" },
    { badge: "আপডেট", text: "সৌদি আরবে নতুন ভিসা ক্যাটাগরি চালু — গৃহকর্মী ভিসার আবেদন শুরু হয়েছে", time: "৫ ঘণ্টা আগে" },
    { badge: "সতর্কতা", text: "মালয়েশিয়া যাওয়ার নামে ৩ লক্ষ টাকা প্রতারণার অভিযোগ — চট্টগ্রামের এজেন্সি", time: "১ দিন আগে" },
    { badge: "নোটিশ", text: "বিএমইটি নতুন নিয়ম: সকল এজেন্সিকে অনলাইনে লাইসেন্স নবায়ন করতে হবে", time: "২ দিন আগে" },
];

export default function Home() {
    return (
        <div className="ms-page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla&family=Hind+Siliguri:wght@400;500;600;700;800&display=swap');

                .ms-page {
                    --ink: #1C231F;
                    --deep: #0B3D2E;
                    --deep-2: #0E4A38;
                    --paper: #F6F1E4;
                    --line: rgba(11,61,46,0.16);
                    --line-on-dark: rgba(244,231,196,0.24);
                    --gold: #C8973B;
                    --gold-soft: #E4C77A;
                    --gold-deep: #9C7426;
                    --red: #8C2F2A;
                    --red-soft: rgba(140,47,42,0.08);
                    --cream: #FBF8F0;
                    --muted: #5B6660;
                    --muted-on-dark: rgba(246,241,228,0.74);
                    font-family: 'Hind Siliguri', sans-serif;
                    color: var(--ink);
                    max-width: 100%;
                }

                /* ── Hero ── */
                .ms-hero {
                    position: relative;
                    background: linear-gradient(155deg, var(--deep) 0%, var(--deep-2) 55%, #133E2E 100%);
                    border-radius: 18px;
                    overflow: hidden;
                    padding: 56px 48px;
                    margin-bottom: 28px;
                    isolation: isolate;
                }
                .ms-hero::before {
                    content: '';
                    position: absolute; inset: 0;
                    background-image: repeating-linear-gradient(115deg, rgba(244,231,196,0.05) 0px, rgba(244,231,196,0.05) 1px, transparent 1px, transparent 14px);
                    pointer-events: none;
                }
                .ms-hero::after {
                    content: '';
                    position: absolute; inset: 10px;
                    border: 1px solid rgba(200,151,59,0.35);
                    border-radius: 12px;
                    pointer-events: none;
                }
                .ms-hero-grid {
                    position: relative; z-index: 1;
                    display: flex; align-items: center; justify-content: space-between;
                    gap: 40px; flex-wrap: wrap;
                }
                .ms-hero-left { flex: 1; min-width: 280px; }
                .ms-hero-kicker {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-size: 12.5px; font-weight: 600; color: var(--gold-soft);
                    letter-spacing: 0.04em;
                    padding-bottom: 14px; margin-bottom: 18px;
                    border-bottom: 1px solid var(--line-on-dark);
                }
                .ms-hero-title {
                    font-family: 'Tiro Bangla', serif;
                    font-size: clamp(28px, 4vw, 44px);
                    font-weight: 400; color: var(--cream);
                    line-height: 1.32; margin: 0 0 16px;
                }
                .ms-hero-title em {
                    font-style: normal; color: var(--gold-soft);
                    border-bottom: 2px solid var(--gold); padding-bottom: 2px;
                }
                .ms-hero-sub {
                    font-size: 16px; color: var(--muted-on-dark);
                    line-height: 1.75; max-width: 460px; margin: 0 0 28px;
                }
                .ms-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 22px; }
                .ms-hero-meta { font-size: 12.5px; color: var(--muted-on-dark); display: flex; align-items: center; gap: 8px; }
                .ms-hero-meta::before { content: '✓'; color: var(--gold-soft); font-weight: 700; }
                .ms-hero-right { flex-shrink: 0; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }

                .ms-seal {
                    width: 176px; height: 176px; border-radius: 50%;
                    border: 2px solid var(--gold);
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    transform: rotate(-8deg);
                    background: rgba(244,231,196,0.03);
                    position: relative;
                    animation: msSealIn 0.6s ease-out;
                }
                .ms-seal::before {
                    content: ''; position: absolute; inset: 11px;
                    border: 1px dashed var(--gold-soft); border-radius: 50%;
                }
                .ms-seal-check { font-size: 28px; color: var(--gold-soft); line-height: 1; margin-bottom: 6px; }
                .ms-seal-text { font-family: 'Tiro Bangla', serif; font-size: 15px; color: var(--cream); }
                .ms-seal-sub { font-size: 10px; color: var(--muted-on-dark); letter-spacing: 0.12em; margin-top: 4px; }
                @keyframes msSealIn { from { opacity: 0; transform: rotate(-20deg) scale(0.85); } to { opacity: 1; transform: rotate(-8deg) scale(1); } }

                /* ── Buttons ── */
                .ms-btn {
                    font-family: 'Hind Siliguri', sans-serif;
                    font-size: 14.5px; font-weight: 700;
                    padding: 12px 26px; border-radius: 8px;
                    text-decoration: none; display: inline-block;
                    white-space: nowrap;
                    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
                }
                .ms-btn-gold { background: var(--gold); color: var(--deep); }
                .ms-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(200,151,59,0.35); }
                .ms-btn-outline { background: transparent; border: 1.5px solid var(--line-on-dark); color: var(--cream); }
                .ms-btn-outline:hover { border-color: var(--gold-soft); color: var(--gold-soft); }
                .ms-btn-dark { background: transparent; border: 1.5px solid var(--deep); color: var(--deep); }
                .ms-btn-dark:hover { background: var(--deep); color: var(--cream); }
                .ms-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

                /* ── Ledger strip ── */
                .ms-ledger {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1px; background: var(--line);
                    border: 1px solid var(--line); border-radius: 14px;
                    overflow: hidden; margin-bottom: 52px;
                }
                .ms-ledger-item { background: var(--paper); padding: 22px 18px; text-align: center; }
                .ms-ledger-val { font-family: 'Tiro Bangla', serif; font-size: 26px; font-weight: 400; color: var(--deep); margin-bottom: 4px; }
                .ms-ledger-label { font-size: 12.5px; color: var(--muted); font-weight: 500; }

                /* ── Section heads ── */
                .ms-section { margin-bottom: 60px; }
                .ms-section-head { text-align: center; margin-bottom: 34px; }
                .ms-eyebrow {
                    display: inline-block; font-size: 11.5px; font-weight: 700;
                    color: var(--gold-deep); letter-spacing: 0.14em;
                    padding-bottom: 6px; margin-bottom: 12px;
                    border-bottom: 2px solid var(--gold);
                }
                .ms-title { font-family: 'Tiro Bangla', serif; font-size: clamp(21px, 3vw, 29px); font-weight: 400; color: var(--ink); }

                /* ── Counters (features) ── */
                .ms-counters {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
                    gap: 1px; background: var(--line);
                    border: 1px solid var(--line); border-radius: 14px; overflow: hidden;
                }
                .ms-counter {
                    position: relative; background: var(--paper);
                    padding: 30px 24px 26px; text-decoration: none; color: inherit;
                    display: block; transition: background 0.18s ease;
                }
                .ms-counter:hover { background: var(--cream); }
                .ms-counter::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent); }
                .ms-counter-tag {
                    display: inline-block; font-size: 11px; font-weight: 700; color: var(--muted);
                    letter-spacing: 0.08em; margin-bottom: 16px; padding-bottom: 6px;
                    border-bottom: 1px dashed var(--line);
                }
                .ms-counter-icon { font-size: 24px; margin-bottom: 12px; display: block; }
                .ms-counter-title { font-family: 'Tiro Bangla', serif; font-size: 17px; font-weight: 400; color: var(--ink); margin: 0 0 8px; }
                .ms-counter-desc { font-size: 13px; color: var(--muted); line-height: 1.65; margin: 0 0 16px; }
                .ms-counter-link { font-size: 12.5px; font-weight: 700; color: var(--accent); }
                .ms-counter:focus-visible { outline: 2px solid var(--gold); outline-offset: -2px; }

                /* ── Boarding-pass steps ── */
                .ms-tickets { display: flex; align-items: stretch; flex-wrap: wrap; }
                .ms-ticket {
                    flex: 1 1 200px; background: var(--paper);
                    border: 1px solid var(--line); border-radius: 10px;
                    padding: 26px 22px; text-align: center;
                }
                .ms-ticket-connector { width: 26px; flex-shrink: 0; position: relative; }
                .ms-ticket-connector::before {
                    content: ''; position: absolute; left: 50%; top: 14px; bottom: 14px;
                    border-left: 2px dashed var(--gold-soft); transform: translateX(-50%);
                }
                .ms-ticket-connector::after {
                    content: ''; position: absolute; left: 50%; top: 50%;
                    width: 8px; height: 8px; border-radius: 50%; background: var(--gold);
                    transform: translate(-50%, -50%);
                }
                .ms-ticket-num { font-family: 'Tiro Bangla', serif; font-size: 30px; color: var(--gold-deep); opacity: 0.5; line-height: 1; margin-bottom: 10px; }
                .ms-ticket-title { font-size: 16px; font-weight: 700; color: var(--ink); margin: 0 0 8px; }
                .ms-ticket-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin: 0; }

                /* ── Notice board (alerts) ── */
                .ms-board { display: flex; flex-direction: column; }
                .ms-board-row {
                    display: flex; align-items: flex-start; gap: 16px;
                    padding: 16px 4px; border-bottom: 1px solid var(--line); flex-wrap: wrap;
                }
                .ms-board-row:first-child { border-top: 1px solid var(--line); }
                .ms-tag { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; margin-top: 2px; }
                .ms-tag-warn { background: var(--red-soft); color: var(--red); border: 1px solid rgba(140,47,42,0.3); position: relative; transform: rotate(-3deg); }
                .ms-tag-warn::after { content: ''; position: absolute; inset: -2px; border: 1px dashed rgba(140,47,42,0.4); border-radius: 5px; }
                .ms-tag-info { background: rgba(11,61,46,0.07); color: var(--deep); }
                .ms-board-text { font-size: 13.5px; color: var(--ink); line-height: 1.6; flex: 1; min-width: 220px; }
                .ms-board-time { font-size: 12px; color: var(--muted); white-space: nowrap; flex-shrink: 0; margin-top: 3px; }

                /* ── CTA ── */
                .ms-cta {
                    position: relative; overflow: hidden;
                    background: linear-gradient(155deg, var(--deep) 0%, var(--deep-2) 100%);
                    border-radius: 18px; padding: 54px 40px; text-align: center;
                }
                .ms-cta::before {
                    content: ''; position: absolute; inset: 0;
                    background-image: repeating-linear-gradient(115deg, rgba(244,231,196,0.05) 0px, rgba(244,231,196,0.05) 1px, transparent 1px, transparent 14px);
                    pointer-events: none;
                }
                .ms-cta-title { position: relative; font-family: 'Tiro Bangla', serif; font-size: clamp(22px, 3vw, 30px); color: var(--cream); margin: 0 0 12px; }
                .ms-cta-sub { position: relative; font-size: 15px; color: var(--muted-on-dark); margin: 0 0 28px; line-height: 1.6; }
                .ms-cta .ms-btn { position: relative; }

                /* ── Responsive ── */
                @media (max-width: 720px) {
                    .ms-hero { padding: 40px 24px; }
                    .ms-hero-grid { flex-direction: column-reverse; }
                    .ms-hero-right { margin-bottom: 8px; }
                    .ms-tickets { flex-direction: column; }
                    .ms-ticket-connector { width: auto; height: 26px; }
                    .ms-ticket-connector::before { left: 14px; right: 14px; top: 50%; bottom: auto; height: 0; border-left: none; border-top: 2px dashed var(--gold-soft); transform: translateY(-50%); }
                    .ms-board-row { flex-direction: column; gap: 8px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ms-seal { animation: none; }
                    .ms-btn, .ms-counter { transition: none; }
                }
            `}</style>

            {/* ── Hero ── */}
            <section className="ms-hero">
                <div className="ms-hero-grid">
                    <div className="ms-hero-left">
                        <div className="ms-hero-kicker">
                            <span aria-hidden="true">🇧🇩</span> বাংলাদেশের বিদেশগামী শ্রমিকদের জন্য
                        </div>
                        <h1 className="ms-hero-title">
                            প্রতারণামুক্ত বিদেশযাত্রার<br />
                            <em>বিশ্বস্ত সঙ্গী</em>
                        </h1>
                        <p className="ms-hero-sub">
                            এজেন্সি যাচাই করুন, অভিযোগ করুন, কমিউনিটির সাথে যুক্ত হন —
                            সব এক জায়গায়
                        </p>
                        <div className="ms-hero-actions">
                            <Link to="/agencies" className="ms-btn ms-btn-gold">এজেন্সি খুঁজুন →</Link>
                            <Link to="/register" className="ms-btn ms-btn-outline">বিনামূল্যে নিবন্ধন</Link>
                        </div>
                        <div className="ms-hero-meta">যাচাই-ভিত্তিক সুরক্ষা ব্যবস্থা</div>
                    </div>
                    <div className="ms-hero-right">
                        <div className="ms-seal" aria-hidden="true">
                            <span className="ms-seal-check">✓</span>
                            <span className="ms-seal-text">যাচাইকৃত</span>
                            <span className="ms-seal-sub">MIGRANT SAHAY</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Ledger / stats ── */}
            <div className="ms-ledger">
                {STATS.map((st) => (
                    <div key={st.label} className="ms-ledger-item">
                        <div className="ms-ledger-val">{st.value}</div>
                        <div className="ms-ledger-label">{st.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Counters / features ── */}
            <section className="ms-section">
                <div className="ms-section-head">
                    <span className="ms-eyebrow">সেবা কাউন্টার</span>
                    <h2 className="ms-title">প্রয়োজনের সময় যেখানে যাবেন</h2>
                </div>
                <div className="ms-counters">
                    {FEATURES.map((f) => (
                        <Link to={f.to} key={f.to} className="ms-counter" style={{ "--accent": f.color }}>
                            <span className="ms-counter-tag">কাউন্টার {f.tag}</span>
                            <span className="ms-counter-icon" aria-hidden="true">{f.icon}</span>
                            <h3 className="ms-counter-title">{f.title}</h3>
                            <p className="ms-counter-desc">{f.desc}</p>
                            <span className="ms-counter-link">বিস্তারিত দেখুন →</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Boarding-pass steps ── */}
            <section className="ms-section">
                <div className="ms-section-head">
                    <span className="ms-eyebrow">যাত্রার ধাপ</span>
                    <h2 className="ms-title">মাত্র ৩টি ধাপে শুরু করুন</h2>
                </div>
                <div className="ms-tickets">
                    {STEPS.map((st, i) => (
                        <Fragment key={st.num}>
                            <div className="ms-ticket">
                                <div className="ms-ticket-num">{st.num}</div>
                                <h3 className="ms-ticket-title">{st.title}</h3>
                                <p className="ms-ticket-desc">{st.desc}</p>
                            </div>
                            {i < STEPS.length - 1 && <div className="ms-ticket-connector" aria-hidden="true" />}
                        </Fragment>
                    ))}
                </div>
            </section>

            {/* ── Notice board / alerts ── */}
            <section className="ms-section">
                <div className="ms-section-head">
                    <span className="ms-eyebrow">নোটিশ বোর্ড</span>
                    <h2 className="ms-title">সাম্প্রতিক সতর্কতা ও নোটিশ</h2>
                </div>
                <div className="ms-board">
                    {ALERTS.map((a, i) => (
                        <div key={i} className="ms-board-row">
                            <span className={`ms-tag ${a.badge === "সতর্কতা" ? "ms-tag-warn" : "ms-tag-info"}`}>
                                {a.badge}
                            </span>
                            <p className="ms-board-text">{a.text}</p>
                            <span className="ms-board-time">{a.time}</span>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: "center", marginTop: 24 }}>
                    <Link to="/reports" className="ms-btn ms-btn-dark">সব অভিযোগ দেখুন →</Link>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="ms-cta">
                <h2 className="ms-cta-title">এখনই শুরু করুন — বিনামূল্যে</h2>
                <p className="ms-cta-sub">হাজারো শ্রমিক ইতিমধ্যে আমাদের সাথে আছেন। আপনিও যোগ দিন।</p>
                <Link to="/register" className="ms-btn ms-btn-gold">অ্যাকাউন্ট খুলুন →</Link>
            </section>
        </div>
    );
}