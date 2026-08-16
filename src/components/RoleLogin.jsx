import React, { useState } from "react";
import { palette, inputStyle } from "../theme";

export default function RoleLogin() {
    const [role, setRole] = useState("student"); // "student" | "teacher"
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const isStudent = role === "student";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isStudent ? "/api/member/login" : "/api/teacher/login";
        const body = isStudent
            ? { roll_number: identifier, password }
            : { username: identifier, password };

        try {
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Login failed.");
                return;
            }
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("name", data.name);
            // TODO: navigate to /student-dashboard or /teacher-dashboard once routing is wired up
            console.log("Logged in:", data);
        } catch (err) {
            alert("Could not reach the server. Is the Flask backend running?");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                background: palette.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                padding: "24px",
                boxSizing: "border-box",
            }}
        >
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500;600&family=Inter:wght@400;500;600&display=swap"
            />

            <div style={{ width: "100%", maxWidth: "400px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "28px",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: palette.burnt,
                        }}
                    />
                    <span
                        style={{
                            fontSize: "13px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: palette.primary,
                            fontWeight: 500,
                        }}
                    >
                        Class Committee Meeting Portal
                    </span>
                </div>

                <div
                    style={{
                        background: palette.card,
                        borderRadius: "16px",
                        border: `1px solid ${palette.border}`,
                        padding: "36px 32px 32px",
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "'Source Serif 4', Georgia, serif",
                            fontSize: "26px",
                            fontWeight: 600,
                            color: palette.heading,
                            margin: "0 0 6px",
                            textAlign: "center",
                        }}
                    >
                        Welcome back
                    </h1>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#6b6b5f",
                            textAlign: "center",
                            margin: "0 0 28px",
                        }}
                    >
                        Sign in to continue to the portal
                    </p>

                    {/* Role tabs */}
                    <div
                        role="tablist"
                        aria-label="Login as"
                        style={{
                            display: "flex",
                            borderBottom: `1px solid ${palette.border}`,
                            marginBottom: "24px",
                        }}
                    >
                        {[
                            { key: "student", label: "Student" },
                            { key: "teacher", label: "Teacher" },
                        ].map((tab) => {
                            const active = role === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    role="tab"
                                    aria-selected={active}
                                    type="button"
                                    onClick={() => setRole(tab.key)}
                                    style={{
                                        flex: 1,
                                        padding: "10px 0 12px",
                                        background: "transparent",
                                        border: "none",
                                        borderBottom: active
                                            ? `2px solid ${palette.burnt}`
                                            : "2px solid transparent",
                                        marginBottom: "-1px",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: active ? palette.heading : "#9a9a86",
                                        cursor: "pointer",
                                        transition: "color 0.15s ease, border-color 0.15s ease",
                                    }}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label
                            htmlFor="identifier"
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: palette.heading,
                                marginBottom: "6px",
                            }}
                        >
                            {isStudent ? "Roll number" : "Username"}
                        </label>
                        <input
                            id="identifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder={isStudent ? "e.g. 21CS045" : "teacher.username"}
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = palette.burnt)}
                            onBlur={(e) => (e.target.style.borderColor = palette.border)}
                        />

                        <label
                            htmlFor="password"
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: palette.heading,
                                margin: "18px 0 6px",
                            }}
                        >
                            Password
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                style={{ ...inputStyle, paddingRight: "68px" }}
                                onFocus={(e) => (e.target.style.borderColor = palette.burnt)}
                                onBlur={(e) => (e.target.style.borderColor = palette.border)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                style={{
                                    position: "absolute",
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: palette.primary,
                                    cursor: "pointer",
                                }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                marginTop: "26px",
                                padding: "12px 0",
                                borderRadius: "10px",
                                border: "none",
                                background: palette.primary,
                                color: palette.bg,
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "background 0.15s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.background = palette.primaryHover)
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.background = palette.primary)
                            }
                        >
                            Sign in as {isStudent ? "student" : "teacher"}
                        </button>
                    </form>
                </div>

                <p
                    style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#9a9a86",
                        marginTop: "20px",
                    }}
                >
                    Trouble signing in? Contact your class committee admin.
                </p>
            </div>
        </div>
    );
}