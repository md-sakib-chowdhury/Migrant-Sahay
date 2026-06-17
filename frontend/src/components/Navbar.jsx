
// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const NAV_LINKS = [
//     { to: "/", label: "হোম", icon: "🏠" },
//     { to: "/agencies", label: "এজেন্সি", icon: "🏢" },
//     { to: "/reports", label: "অভিযোগ", icon: "⚠️" },
//     { to: "/forum", label: "ফোরাম", icon: "💬" },
//     { to: "/remittance", label: "রেমিট্যান্স", icon: "💸" },
// ];

// export default function Navbar() {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();
//     const { pathname } = useLocation();
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth <= 768);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const handleLogout = () => {
//         logout();
//         setMenuOpen(false);
//         navigate("/");
//     };

//     const initials = user?.name ? user.name.charAt(0).toUpperCase() : "?";

//     return (
//         <nav style={styles.nav}>
//             <div style={styles.inner}>

//                 {/* Brand */}
//                 <Link to="/" style={styles.brand} onClick={() => setMenuOpen(false)}>
//                     <span style={styles.brandIcon}>🌍</span>
//                     <span style={styles.brandTextWrap}>
//                         <span style={styles.brandMain}>মাইগ্রেন্ট সহায়</span>
//                         <span style={styles.brandSub}>Migrant Support Platform</span>
//                     </span>
//                 </Link>

//                 {/* Desktop links */}
//                 <div style={{ ...styles.desktopLinks, display: isMobile ? "none" : "flex", justifyContent: "center" }}>
//                     {NAV_LINKS.map(({ to, label }) => {
//                         const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
//                         return (
//                             <Link
//                                 key={to}
//                                 to={to}
//                                 style={{
//                                     ...styles.navLink,
//                                     color: active ? "#ffffff" : "#94a3b8",
//                                     background: active ? "rgba(255,255,255,0.07)" : "transparent",
//                                     borderBottom: active ? "2px solid #f59e0b" : "2px solid transparent",
//                                 }}
//                             >
//                                 {label}
//                             </Link>
//                         );
//                     })}
//                 </div>

//                 {/* Desktop auth */}
//                 <div style={{ ...styles.divider, display: isMobile ? "none" : "block" }} />
//                 <div style={{ ...styles.authRow, display: isMobile ? "none" : "flex" }}>
//                     {user ? (
//                         <>
//                             {user.role === "admin" && (
//                                 <Link to="/admin" style={styles.adminBadge}>
//                                     <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
//                                         stroke="currentColor" strokeWidth="2">
//                                         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//                                     </svg>
//                                     Admin Panel
//                                 </Link>
//                             )}
//                             <div style={styles.avatar}>{initials}</div>
//                             <button onClick={handleLogout} style={styles.btnLogout}>
//                                 লগআউট
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/login" style={styles.btnLoginText}>লগইন</Link>
//                             <Link to="/register" style={styles.btnRegister}>নিবন্ধন করুন →</Link>
//                         </>
//                     )}
//                 </div>

//                 {/* Hamburger */}
//                 <button
//                     onClick={() => setMenuOpen(o => !o)}
//                     style={{ ...styles.hamburger, display: isMobile ? "flex" : "none" }}
//                     aria-label="Toggle menu"
//                 >
//                     {menuOpen ? (
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
//                             stroke="#fff" strokeWidth="2.5">
//                             <path d="M18 6L6 18M6 6l12 12" />
//                         </svg>
//                     ) : (
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
//                             stroke="#94a3b8" strokeWidth="2.5">
//                             <path d="M3 12h18M3 6h18M3 18h18" />
//                         </svg>
//                     )}
//                 </button>
//             </div>

//             {/* Mobile Drawer */}
//             {menuOpen && isMobile && (
//                 <div style={styles.drawer}>
//                     <div style={styles.drawerLinks}>
//                         {NAV_LINKS.map(({ to, label, icon }) => {
//                             const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
//                             return (
//                                 <Link
//                                     key={to}
//                                     to={to}
//                                     onClick={() => setMenuOpen(false)}
//                                     style={{
//                                         ...styles.mobileLink,
//                                         color: active ? "#fff" : "#94a3b8",
//                                         background: active ? "rgba(255,255,255,0.07)" : "transparent",
//                                     }}
//                                 >
//                                     <span style={{ fontSize: 16 }}>{icon}</span>
//                                     {label}
//                                 </Link>
//                             );
//                         })}
//                     </div>

//                     <div style={styles.drawerAuth}>
//                         {user ? (
//                             <>
//                                 <div style={styles.drawerProfile}>
//                                     <div style={styles.avatar}>{initials}</div>
//                                     <span style={{ color: "#cbd5e1", fontSize: 14 }}>
//                                         {user.name || user.email}
//                                     </span>
//                                 </div>
//                                 {user.role === "admin" && (
//                                     <Link
//                                         to="/admin"
//                                         onClick={() => setMenuOpen(false)}
//                                         style={{ ...styles.adminBadge, justifyContent: "center" }}
//                                     >
//                                         Admin Panel
//                                     </Link>
//                                 )}
//                                 <button onClick={handleLogout} style={{ ...styles.btnLogout, width: "100%", padding: "10px" }}>
//                                     লগআউট
//                                 </button>
//                             </>
//                         ) : (
//                             <div style={{ display: "flex", gap: 10 }}>
//                                 <Link
//                                     to="/login"
//                                     onClick={() => setMenuOpen(false)}
//                                     style={styles.mobileBtnLogin}
//                                 >
//                                     লগইন
//                                 </Link>
//                                 <Link
//                                     to="/register"
//                                     onClick={() => setMenuOpen(false)}
//                                     style={{ ...styles.btnRegister, flex: 1, textAlign: "center", padding: "10px 16px" }}
//                                 >
//                                     নিবন্ধন করুন →
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// }

// const styles = {
//     nav: {
//         background: "#0f2554",
//         borderBottom: "1px solid rgba(255,255,255,0.08)",
//         fontFamily: "'Hind Siliguri', sans-serif",
//         position: "relative",
//         zIndex: 100,
//     },
//     inner: {
//         maxWidth: 2000,
//         margin: "0 auto",
//         padding: "0 18px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         height: 64,
//         gap: 16,
//     },
//     brand: {
//         display: "flex", alignItems: "center", gap: 10,
//         textDecoration: "none", flexShrink: 0,
//     },
//     brandIcon: {
//         width: 36, height: 36,
//         background: "#f59e0b",
//         borderRadius: 8,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         fontSize: 18,
//     },
//     brandTextWrap: {
//         display: "flex", flexDirection: "column", lineHeight: 1.15,
//     },
//     brandMain: {
//         fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "0.01em",
//     },
//     brandSub: {
//         fontSize: 9.5, color: "#f59e0b",
//         letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
//     },
//     desktopLinks: {
//         alignItems: "center", gap: 2, flex: 1,
//     },
//     navLink: {
//         fontSize: 13.5, fontWeight: 500,
//         padding: "6px 12px",
//         borderRadius: "6px 6px 0 0",
//         textDecoration: "none",
//         whiteSpace: "nowrap",
//     },
//     divider: {
//         width: 1, height: 22,
//         background: "rgba(255,255,255,0.12)",
//         flexShrink: 0,
//     },
//     authRow: {
//         alignItems: "center", gap: 8, flexShrink: 0,
//     },
//     avatar: {
//         width: 32, height: 32, borderRadius: "50%",
//         background: "rgba(245,158,11,0.15)",
//         border: "1.5px solid rgba(245,158,11,0.4)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         fontSize: 13, color: "#f59e0b", fontWeight: 700,
//     },
//     adminBadge: {
//         display: "flex", alignItems: "center", gap: 5,
//         background: "rgba(245,158,11,0.12)",
//         border: "1px solid rgba(245,158,11,0.28)",
//         color: "#f59e0b",
//         fontSize: 12, fontWeight: 600,
//         padding: "5px 10px", borderRadius: 6,
//         textDecoration: "none",
//     },
//     btnLoginText: {
//         color: "#94a3b8", textDecoration: "none",
//         fontSize: 13.5, fontWeight: 500,
//         padding: "6px 12px", borderRadius: 6,
//     },
//     btnRegister: {
//         background: "#f59e0b", color: "#0f2554",
//         fontSize: 13, fontWeight: 700,
//         padding: "7px 16px", borderRadius: 7,
//         textDecoration: "none", whiteSpace: "nowrap",
//     },
//     btnLogout: {
//         background: "rgba(239,68,68,0.12)",
//         border: "1px solid rgba(239,68,68,0.28)",
//         color: "#fca5a5",
//         fontSize: 13, fontWeight: 600,
//         padding: "6px 14px", borderRadius: 7, cursor: "pointer",
//     },
//     hamburger: {
//         alignItems: "center", justifyContent: "center",
//         background: "rgba(255,255,255,0.06)",
//         border: "1px solid rgba(255,255,255,0.1)",
//         borderRadius: 7, padding: 8, cursor: "pointer",
//     },
//     drawer: {
//         background: "#0c2050",
//         borderTop: "1px solid rgba(255,255,255,0.08)",
//         padding: "12px 20px 16px",
//     },
//     drawerLinks: {
//         display: "flex", flexDirection: "column", gap: 2,
//         borderBottom: "1px solid rgba(255,255,255,0.08)",
//         paddingBottom: 12, marginBottom: 12,
//     },
//     mobileLink: {
//         display: "flex", alignItems: "center", gap: 10,
//         fontSize: 14, fontWeight: 500,
//         padding: "9px 10px", borderRadius: 7,
//         textDecoration: "none",
//     },
//     drawerAuth: {
//         display: "flex", flexDirection: "column", gap: 8,
//     },
//     drawerProfile: {
//         display: "flex", alignItems: "center", gap: 10,
//         padding: "8px 10px",
//         background: "rgba(255,255,255,0.04)",
//         borderRadius: 8, marginBottom: 4,
//     },
//     mobileBtnLogin: {
//         flex: 1, textAlign: "center",
//         color: "#94a3b8", textDecoration: "none",
//         fontSize: 14, fontWeight: 500,
//         padding: "10px 12px", borderRadius: 7,
//         border: "1px solid rgba(255,255,255,0.12)",
//     },
// };
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
    { to: "/", label: "হোম", icon: "🏠" },
    { to: "/agencies", label: "এজেন্সি", icon: "🏢" },
    { to: "/reports", label: "অভিযোগ", icon: "⚠️" },
    { to: "/forum", label: "ফোরাম", icon: "💬" },
    { to: "/remittance", label: "রেমিট্যান্স", icon: "💸" },
];

const COLORS = {
    deep: "#0B3D2E",
    deep2: "#0E4A38",
    deepDrawer: "#082A20",
    gold: "#C8973B",
    goldSoft: "#E4C77A",
    cream: "#FBF8F0",
    mutedOnDark: "rgba(246,241,228,0.62)",
    hairline: "rgba(244,231,196,0.14)",
    red: "#D98C82",
    redSoft: "rgba(140,47,42,0.16)",
    redBorder: "rgba(140,47,42,0.35)",
};

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/");
    };

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : "?";

    return (
        <nav style={styles.nav}>
            <div style={styles.inner}>

                {/* Brand */}
                <Link to="/" style={styles.brand} onClick={() => setMenuOpen(false)}>
                    <div style={styles.brandLogoBox}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.deep} strokeWidth="2.2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                        </svg>
                    </div>
                    <span style={styles.brandTextWrap}>
                        <span style={styles.brandMain}>মাইগ্রেন্ট সহায়</span>
                        <span style={styles.brandSub}>Migrant Support Platform</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <div style={{ ...styles.desktopLinks, display: isMobile ? "none" : "flex", justifyContent: "center" }}>
                    {NAV_LINKS.map(({ to, label }) => {
                        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
                        return (
                            <Link
                                key={to}
                                to={to}
                                style={{
                                    ...styles.navLink,
                                    color: active ? COLORS.cream : COLORS.mutedOnDark,
                                    background: active ? "rgba(244,231,196,0.08)" : "transparent",
                                    borderBottom: active ? `2px solid ${COLORS.gold}` : "2px solid transparent",
                                }}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop auth */}
                <div style={{ ...styles.divider, display: isMobile ? "none" : "block" }} />
                <div style={{ ...styles.authRow, display: isMobile ? "none" : "flex" }}>
                    {user ? (
                        <>
                            {user.role === "admin" && (
                                <Link to="/admin" style={styles.adminBadge}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                    Admin Panel
                                </Link>
                            )}
                            <div style={styles.avatar}>{initials}</div>
                            <button onClick={handleLogout} style={styles.btnLogout}>
                                লগআউট
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.btnLoginText}>লগইন</Link>
                            <Link to="/register" style={styles.btnRegister}>নিবন্ধন করুন →</Link>
                        </>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(o => !o)}
                    style={{ ...styles.hamburger, display: isMobile ? "flex" : "none" }}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke={COLORS.cream} strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke={COLORS.mutedOnDark} strokeWidth="2.5">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Drawer */}
            {menuOpen && isMobile && (
                <div style={styles.drawer}>
                    <div style={styles.drawerLinks}>
                        {NAV_LINKS.map(({ to, label, icon }) => {
                            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        ...styles.mobileLink,
                                        color: active ? COLORS.cream : COLORS.mutedOnDark,
                                        background: active ? "rgba(244,231,196,0.08)" : "transparent",
                                    }}
                                >
                                    <span style={{ fontSize: 16 }}>{icon}</span>
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    <div style={styles.drawerAuth}>
                        {user ? (
                            <>
                                <div style={styles.drawerProfile}>
                                    <div style={styles.avatar}>{initials}</div>
                                    <span style={{ color: COLORS.mutedOnDark, fontSize: 14 }}>
                                        {user.name || user.email}
                                    </span>
                                </div>
                                {user.role === "admin" && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setMenuOpen(false)}
                                        style={{ ...styles.adminBadge, justifyContent: "center" }}
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                                <button onClick={handleLogout} style={{ ...styles.btnLogout, width: "100%", padding: "10px" }}>
                                    লগআউট
                                </button>
                            </>
                        ) : (
                            <div style={{ display: "flex", gap: 10 }}>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    style={styles.mobileBtnLogin}
                                >
                                    লগইন
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    style={{ ...styles.btnRegister, flex: 1, textAlign: "center", padding: "10px 16px" }}
                                >
                                    নিবন্ধন করুন →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

const styles = {
    nav: {
        background: COLORS.deep,
        borderBottom: `1px solid ${COLORS.hairline}`,
        fontFamily: "'Hind Siliguri', sans-serif",
        position: "relative",
        zIndex: 100,
    },
    inner: {
        width: "97%",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        gap: 8,
    },
    brand: {
        display: "flex", alignItems: "center", gap: 10,
        textDecoration: "none", flexShrink: 0,
    },
    brandLogoBox: {
        width: 38, height: 38,
        background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldSoft})`,
        borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(200,151,59,0.35)",
    },
    brandTextWrap: {
        display: "flex", flexDirection: "column", lineHeight: 1.15,
    },
    brandMain: {
        fontSize: 15, fontWeight: 700, color: COLORS.cream, letterSpacing: "0.01em",
    },
    brandSub: {
        fontSize: 9.5, color: COLORS.goldSoft,
        letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
    },
    desktopLinks: {
        alignItems: "center", gap: 2, flex: 1,
    },
    navLink: {
        fontSize: 13, fontWeight: 500,
        padding: "6px 9px",
        borderRadius: "6px 6px 0 0",
        textDecoration: "none",
        whiteSpace: "nowrap",
    },
    divider: {
        width: 1, height: 22,
        background: COLORS.hairline,
        flexShrink: 0,
    },
    authRow: {
        alignItems: "center", gap: 6, flexShrink: 0,
    },
    avatar: {
        width: 32, height: 32, borderRadius: "50%",
        background: "rgba(200,151,59,0.16)",
        border: `1.5px solid rgba(200,151,59,0.45)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, color: COLORS.goldSoft, fontWeight: 700,
    },
    adminBadge: {
        display: "flex", alignItems: "center", gap: 5,
        background: "rgba(200,151,59,0.12)",
        border: "1px solid rgba(200,151,59,0.3)",
        color: COLORS.goldSoft,
        fontSize: 12, fontWeight: 600,
        padding: "5px 10px", borderRadius: 6,
        textDecoration: "none",
    },
    btnLoginText: {
        color: COLORS.mutedOnDark, textDecoration: "none",
        fontSize: 13.5, fontWeight: 500,
        padding: "6px 8px", borderRadius: 6,
    },
    btnRegister: {
        background: COLORS.gold, color: COLORS.deep,
        fontSize: 13, fontWeight: 700,
        padding: "7px 13px", borderRadius: 7,
        textDecoration: "none", whiteSpace: "nowrap",
    },
    btnLogout: {
        background: COLORS.redSoft,
        border: `1px solid ${COLORS.redBorder}`,
        color: COLORS.red,
        fontSize: 13, fontWeight: 600,
        padding: "6px 14px", borderRadius: 7, cursor: "pointer",
    },
    hamburger: {
        alignItems: "center", justifyContent: "center",
        background: "rgba(244,231,196,0.08)",
        border: `1px solid ${COLORS.hairline}`,
        borderRadius: 7, padding: 8, cursor: "pointer",
    },
    drawer: {
        background: COLORS.deepDrawer,
        borderTop: `1px solid ${COLORS.hairline}`,
        padding: "12px 20px 16px",
    },
    drawerLinks: {
        display: "flex", flexDirection: "column", gap: 2,
        borderBottom: `1px solid ${COLORS.hairline}`,
        paddingBottom: 12, marginBottom: 12,
    },
    mobileLink: {
        display: "flex", alignItems: "center", gap: 10,
        fontSize: 14, fontWeight: 500,
        padding: "9px 10px", borderRadius: 7,
        textDecoration: "none",
    },
    drawerAuth: {
        display: "flex", flexDirection: "column", gap: 8,
    },
    drawerProfile: {
        display: "flex", alignItems: "center", gap: 10,
        padding: "8px 10px",
        background: "rgba(244,231,196,0.05)",
        borderRadius: 8, marginBottom: 4,
    },
    mobileBtnLogin: {
        flex: 1, textAlign: "center",
        color: COLORS.mutedOnDark, textDecoration: "none",
        fontSize: 14, fontWeight: 500,
        padding: "10px 12px", borderRadius: 7,
        border: `1px solid ${COLORS.hairline}`,
    },
};