import React, { useState } from "react";
import { palette, inputStyle } from "../theme";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hook this up to the Flask /api/admin/login endpoint later
        console.log({ username, password });
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
                            background: palette.heading,
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
                        Admin access
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
                        Admin sign in
                    </h1>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#6b6b5f",
                            textAlign: "center",
                            margin: "0 0 28px",
                        }}
                    >
                        Manage members, subjects, and meeting responses
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label
                            htmlFor="username"
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: palette.heading,
                                marginBottom: "6px",
                            }}
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin.username"
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
                                background: palette.heading,
                                color: palette.bg,
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "background 0.15s ease",
                            }}
                            onMouseEnter={(e) => (e.target.style.background = "#1c2611")}
                            onMouseLeave={(e) =>
                                (e.target.style.background = palette.heading)
                            }
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}