import { useState } from "react";
import { palette, inputStyle } from "../theme";

// ---- Mock data — replace with data fetched from Flask API ----
const mockMember = { name: "Rukmini Vasanth", rollNumber: "2403717672622040" };
const mockPortalOpen = true;
const mockSubject = {
    name: "DATABASE MANAGEMENT SYSTEMS",
    faculty: "Dr. N.PRIYA",
    hasLab: false,
};

const cardStyle = {
    background: palette.card,
    borderRadius: "16px",
    border: `1px solid ${palette.border}`,
    padding: "28px 28px 26px",
    marginBottom: "20px",
};

const sectionLabelStyle = {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: "19px",
    fontWeight: 600,
    color: palette.heading,
    margin: 0,
};

const textareaStyle = {
    ...inputStyle,
    minHeight: "110px",
    resize: "vertical",
    lineHeight: 1.5,
    padding: "12px 14px",
};

function LockedBadge() {
    return (
        <span
            style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: palette.primary,
                background: "#eef1e2",
                border: `1px solid ${palette.border}`,
                borderRadius: "999px",
                padding: "4px 10px",
            }}
        >
            Submitted
        </span>
    );
}

function ConfirmModal({ open, onCancel, onConfirm }) {
    if (!open) return null;
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(40, 54, 24, 0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: palette.card,
                    borderRadius: "16px",
                    padding: "26px 26px 22px",
                    maxWidth: "380px",
                    width: "100%",
                    border: `1px solid ${palette.border}`,
                }}
            >
                <h3
                    style={{
                        fontFamily: "'Source Serif 4', Georgia, serif",
                        fontSize: "19px",
                        color: palette.heading,
                        margin: "0 0 10px",
                    }}
                >
                    Are you sure?
                </h3>
                <p style={{ fontSize: "14px", color: "#5c5c4e", lineHeight: 1.5, margin: "0 0 22px" }}>
                    Once submitted, this feedback cannot be edited or taken back. Please
                    review what you've written before confirming.
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={onCancel}
                        style={{
                            flex: 1,
                            padding: "10px 0",
                            borderRadius: "10px",
                            border: `1px solid ${palette.border}`,
                            background: "transparent",
                            color: palette.heading,
                            fontSize: "14px",
                            fontWeight: 500,
                            cursor: "pointer",
                        }}
                    >
                        Go back
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: "10px 0",
                            borderRadius: "10px",
                            border: "none",
                            background: palette.burnt,
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Yes, submit
                    </button>
                </div>
            </div>
        </div>
    );
}

function FeedbackBlock({ title, value, onChange, locked, placeholder }) {
    return (
        <div style={{ marginBottom: "18px" }}>
            <label
                style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: palette.heading,
                    marginBottom: "6px",
                }}
            >
                {title}
            </label>
            {locked ? (
                <div
                    style={{
                        ...textareaStyle,
                        background: "#f6f4e6",
                        color: "#5c5c4e",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {value || <span style={{ color: "#a8a894" }}>No feedback given.</span>}
                </div>
            ) : (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    style={textareaStyle}
                    onFocus={(e) => (e.target.style.borderColor = palette.burnt)}
                    onBlur={(e) => (e.target.style.borderColor = palette.border)}
                />
            )}
        </div>
    );
}

export default function MemberDashboard() {
    const [theoryFeedback, setTheoryFeedback] = useState("");
    const [labFeedback, setLabFeedback] = useState("");
    const [subjectLocked, setSubjectLocked] = useState(false);
    const [subjectModalOpen, setSubjectModalOpen] = useState(false);

    const [generalFeedback, setGeneralFeedback] = useState("");
    const [generalLocked, setGeneralLocked] = useState(false);
    const [generalModalOpen, setGeneralModalOpen] = useState(false);

    const confirmSubjectSubmit = () => {
        // Hook this up to Flask /api/responses endpoint later
        setSubjectLocked(true);
        setSubjectModalOpen(false);
    };

    const confirmGeneralSubmit = () => {
        // Hook this up to Flask /api/general-feedback endpoint later
        setGeneralLocked(true);
        setGeneralModalOpen(false);
    };

    if (!mockPortalOpen) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: palette.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter', -apple-system, sans-serif",
                    padding: "24px",
                }}
            >
                <div style={{ textAlign: "center", maxWidth: "360px" }}>
                    <div
                        style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background: "#eef1e2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 18px",
                            fontSize: "20px",
                        }}
                    >
                        🔒
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Source Serif 4', Georgia, serif",
                            color: palette.heading,
                            fontSize: "22px",
                            margin: "0 0 8px",
                        }}
                    >
                        Portal is currently closed
                    </h2>
                    <p style={{ fontSize: "14px", color: "#6b6b5f", lineHeight: 1.5 }}>
                        The admin hasn't opened feedback submission yet. Check back once
                        your CCM meeting window opens.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: palette.bg,
                fontFamily: "'Inter', -apple-system, sans-serif",
                padding: "40px 20px 60px",
            }}
        >
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500;600&family=Inter:wght@400;500;600&display=swap"
            />

            <div style={{ maxWidth: "620px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ marginBottom: "28px" }}>
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
                    <h1
                        style={{
                            fontFamily: "'Source Serif 4', Georgia, serif",
                            fontSize: "28px",
                            color: palette.heading,
                            margin: "6px 0 4px",
                        }}
                    >
                        Welcome, {mockMember.name}
                    </h1>
                    <p style={{ fontSize: "14px", color: "#6b6b5f", margin: 0 }}>
                        Roll number: {mockMember.rollNumber}
                    </p>
                </div>

                {/* Subject feedback card */}
                <div style={cardStyle}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "4px",
                        }}
                    >
                        <h2 style={sectionLabelStyle}>{mockSubject.name}</h2>
                        {subjectLocked && <LockedBadge />}
                    </div>
                    <p style={{ fontSize: "13px", color: "#8a8a76", margin: "0 0 20px" }}>
                        Faculty: {mockSubject.faculty}
                    </p>

                    <FeedbackBlock
                        title="Theory feedback"
                        value={theoryFeedback}
                        onChange={(e) => setTheoryFeedback(e.target.value)}
                        locked={subjectLocked}
                        placeholder="Share your feedback on the theory sessions — pace, clarity, doubts resolved, etc."
                    />

                    {mockSubject.hasLab && (
                        <FeedbackBlock
                            title="Lab feedback"
                            value={labFeedback}
                            onChange={(e) => setLabFeedback(e.target.value)}
                            locked={subjectLocked}
                            placeholder="Share your feedback on the lab sessions."
                        />
                    )}

                    {!subjectLocked && (
                        <button
                            onClick={() => setSubjectModalOpen(true)}
                            disabled={!theoryFeedback.trim()}
                            style={{
                                marginTop: "6px",
                                padding: "11px 22px",
                                borderRadius: "10px",
                                border: "none",
                                background: theoryFeedback.trim() ? palette.primary : "#c9c9b8",
                                color: palette.bg,
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: theoryFeedback.trim() ? "pointer" : "not-allowed",
                            }}
                        >
                            Submit subject feedback
                        </button>
                    )}
                </div>

                {/* General feedback card */}
                <div style={cardStyle}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "4px",
                        }}
                    >
                        <h2 style={sectionLabelStyle}>General feedback</h2>
                        {generalLocked && <LockedBadge />}
                    </div>
                    <p style={{ fontSize: "13px", color: "#8a8a76", margin: "0 0 20px" }}>
                        Anything outside academics — facilities, hostel, canteen, etc.
                    </p>

                    <FeedbackBlock
                        title="Your feedback"
                        value={generalFeedback}
                        onChange={(e) => setGeneralFeedback(e.target.value)}
                        locked={generalLocked}
                        placeholder="Share any non-academic points you'd like the committee to know."
                    />

                    {!generalLocked && (
                        <button
                            onClick={() => setGeneralModalOpen(true)}
                            disabled={!generalFeedback.trim()}
                            style={{
                                marginTop: "6px",
                                padding: "11px 22px",
                                borderRadius: "10px",
                                border: "none",
                                background: generalFeedback.trim() ? palette.primary : "#c9c9b8",
                                color: palette.bg,
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: generalFeedback.trim() ? "pointer" : "not-allowed",
                            }}
                        >
                            Submit general feedback
                        </button>
                    )}
                </div>
            </div>

            <ConfirmModal
                open={subjectModalOpen}
                onCancel={() => setSubjectModalOpen(false)}
                onConfirm={confirmSubjectSubmit}
            />
            <ConfirmModal
                open={generalModalOpen}
                onCancel={() => setGeneralModalOpen(false)}
                onConfirm={confirmGeneralSubmit}
            />
        </div>
    );
}