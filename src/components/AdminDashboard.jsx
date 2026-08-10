import React, { useState } from "react";
import { palette } from "../theme";
const mockAdmin = { name: "Admin" };
const mockMeeting = { semesterName: "Semester 4 — 2026" };
const mockStats = {
    totalMembers: 12,
    responsesReceived: 7,
    responsesPending: 5,
    generalFeedbackReceived: 9,
};

const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "members", label: "Manage Members", icon: "👥" },
    { key: "subjects", label: "Manage Subjects", icon: "📘" },
    { key: "responses", label: "Live Responses", icon: "📝" },
    { key: "document", label: "Generate Document", icon: "📄" },
];

function StatCard({ label, value, accent }) {
    return (
        <div
            style={{
                background: palette.card,
                borderRadius: "14px",
                border: `1px solid ${palette.border}`,
                padding: "18px 20px",
                flex: "1 1 160px",
            }}
        >
            <p
                style={{
                    fontSize: "12px",
                    color: "#8a8a76",
                    margin: "0 0 8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    fontWeight: 500,
                }}
            >
                {label}
            </p>
            <p
                style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: "30px",
                    fontWeight: 600,
                    color: accent || palette.heading,
                    margin: 0,
                }}
            >
                {value}
            </p>
        </div>
    );
}

export default function AdminDashboard() {
    const [portalOpen, setPortalOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("dashboard");

    const togglePortal = () => {
        // Hook this up to Flask /api/admin/portal-toggle endpoint later
        setPortalOpen((prev) => !prev);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: palette.bg,
                fontFamily: "'Inter', -apple-system, sans-serif",
                display: "flex",
            }}
        >
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500;600&family=Inter:wght@400;500;600&display=swap"
            />

            {/* Sidebar */}
            <aside
                style={{
                    width: "230px",
                    flexShrink: 0,
                    background: palette.heading,
                    padding: "28px 16px",
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                }}
            >
                <div style={{ padding: "0 10px", marginBottom: "34px" }}>
                    <div
                        style={{
                            fontSize: "12px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: palette.tan,
                            fontWeight: 600,
                            marginBottom: "2px",
                        }}
                    >
                        CCM Portal
                    </div>
                    <div style={{ fontSize: "13px", color: "#c9d0b8" }}>
                        Admin console
                    </div>
                </div>

                <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {navItems.map((item) => {
                        const active = activeNav === item.key;
                        return (
                            <button
                                key={item.key}
                                onClick={() => setActiveNav(item.key)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 12px",
                                    borderRadius: "10px",
                                    border: "none",
                                    background: active ? "rgba(254, 250, 224, 0.12)" : "transparent",
                                    color: active ? palette.tan : "#c9d0b8",
                                    fontSize: "14px",
                                    fontWeight: active ? 600 : 500,
                                    textAlign: "left",
                                    cursor: "pointer",
                                }}
                            >
                                <span style={{ fontSize: "15px" }}>{item.icon}</span>
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div style={{ marginTop: "auto", padding: "0 10px" }}>
                    <div style={{ fontSize: "12px", color: "#95a181" }}>
                        Signed in as
                    </div>
                    <div style={{ fontSize: "14px", color: "#fefae0", fontWeight: 500 }}>
                        {mockAdmin.name}
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, padding: "36px 40px 60px", maxWidth: "980px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "28px",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    <div>
                        <span
                            style={{
                                fontSize: "13px",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: palette.primary,
                                fontWeight: 500,
                            }}
                        >
                            {mockMeeting.semesterName}
                        </span>
                        <h1
                            style={{
                                fontFamily: "'Source Serif 4', Georgia, serif",
                                fontSize: "28px",
                                color: palette.heading,
                                margin: "6px 0 0",
                            }}
                        >
                            Dashboard
                        </h1>
                    </div>

                    {/* Portal toggle */}
                    <div
                        style={{
                            background: palette.card,
                            border: `1px solid ${palette.border}`,
                            borderRadius: "14px",
                            padding: "14px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: palette.heading,
                                }}
                            >
                                Portal status
                            </p>
                            <p
                                style={{
                                    margin: "2px 0 0",
                                    fontSize: "12px",
                                    color: portalOpen ? palette.primary : "#a8a894",
                                }}
                            >
                                {portalOpen ? "Open — members can submit" : "Closed"}
                            </p>
                        </div>
                        <button
                            onClick={togglePortal}
                            role="switch"
                            aria-checked={portalOpen}
                            style={{
                                width: "46px",
                                height: "26px",
                                borderRadius: "999px",
                                border: "none",
                                background: portalOpen ? palette.primary : "#d8d6c2",
                                position: "relative",
                                cursor: "pointer",
                                transition: "background 0.15s ease",
                                flexShrink: 0,
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    top: "3px",
                                    left: portalOpen ? "23px" : "3px",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    background: "#fff",
                                    transition: "left 0.15s ease",
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                                }}
                            />
                        </button>
                    </div>
                </div>

                {/* Stat cards */}
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        flexWrap: "wrap",
                        marginBottom: "32px",
                    }}
                >
                    <StatCard label="Total members" value={mockStats.totalMembers} />
                    <StatCard
                        label="Responses received"
                        value={mockStats.responsesReceived}
                        accent={palette.primary}
                    />
                    <StatCard
                        label="Responses pending"
                        value={mockStats.responsesPending}
                        accent={palette.burnt}
                    />
                    <StatCard
                        label="General feedback"
                        value={mockStats.generalFeedbackReceived}
                    />
                </div>

                {/* Quick links */}
                <div
                    style={{
                        background: palette.card,
                        border: `1px solid ${palette.border}`,
                        borderRadius: "16px",
                        padding: "24px 26px",
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "'Source Serif 4', Georgia, serif",
                            fontSize: "18px",
                            color: palette.heading,
                            margin: "0 0 16px",
                        }}
                    >
                        Quick actions
                    </h2>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        {[
                            { label: "Add a member", nav: "members" },
                            { label: "Add a subject", nav: "subjects" },
                            { label: "View responses", nav: "responses" },
                            { label: "Generate document", nav: "document" },
                        ].map((action) => (
                            <button
                                key={action.label}
                                onClick={() => setActiveNav(action.nav)}
                                style={{
                                    padding: "10px 18px",
                                    borderRadius: "10px",
                                    border: `1px solid ${palette.border}`,
                                    background: palette.bg,
                                    color: palette.heading,
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                }}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}