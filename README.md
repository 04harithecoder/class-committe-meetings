# CCM Feedback Portal

## 1. Overview

**Problem statement:** Class Committee Meetings (CCM) are currently held physically after 5 PM, forcing students to return home late. This portal digitizes the subject-wise faculty feedback collection process, letting CCM member representatives submit feedback online instead.

**What it produces:** A formal, structured CCM document (matching the college's existing format) — compiled from digitally submitted feedback instead of a physical meeting transcript.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Python (Flask) |
| Database | MySQL |
| AI/Polishing | LLM API (provider TBD) — API-based only, **not** a custom-trained model |

> Note: The project originally planned Angular for the frontend; this was changed to React early in development.

---

## 3. User Roles

### 🔐 Admin
- Always accessible at a hidden/unlisted route: **`/admin`**
- Manages CCM members and subjects
- Assigns each member to exactly one subject
- Opens/closes the portal (controls when members can submit)
- Views live responses (raw or polished, toggle-able)
- Exports data as PDF (polished only) or CSV (prompts raw vs. polished)

### 🎓 CCM Member
- Accessible at the default route: **`/`**
- Only able to log in / submit feedback when the admin has **opened** the portal
- Each member is assigned exactly **one subject** (theory feedback + lab feedback if the subject has a lab)
- Can also submit **general (non-academic) feedback** — open to all members, not subject-specific

---

## 4. Core Feature Rules (Locked Decisions)

- **One member → one subject.** No multi-subject assignment.
- **Feedback locks on submit.** A confirmation popup ("Once submitted, this cannot be edited or taken back") appears before final lock. Applies to both subject feedback and general feedback.
- **Minimum 4 words / maximum 90 words** per feedback field — enforced client-side (prevents junk single-word submissions and caps input length for API/security reasons).
- **AI polishing happens in real time**, immediately on submission — not deferred to document-generation time.
  - Both **raw** and **polished** versions are stored in the database.
  - Admin can toggle between raw/polished when viewing responses.
- **General feedback is AI-summarized** — all members' individual submissions get combined into a single consolidated section (not shown as a raw list).
- **PDF export uses polished text only.**
- **CSV export prompts the admin** to choose raw or polished before downloading.
- **Hard delete for members each semester** — no soft delete, no historical retention. Once a semester ends, member records are simply removed.

---

## 5. Database Schema (8 Tables)

### `admins`
```
id (PK), username, password_hash, name, created_at
```

### `members`
```
id (PK), roll_number (unique), name, email, password_hash, semester, created_at
```

### `subjects`
```
id (PK), subject_name, subject_code, faculty_name, has_lab (boolean), semester, meeting_id (FK → meetings.id)
```

### `member_subject_assignment`
```
id (PK), member_id (FK → members.id), subject_id (FK → subjects.id), meeting_id (FK → meetings.id)
```

### `meetings`
```
id (PK), semester_name, is_portal_open (boolean), created_at, closed_at
```

### `responses`
```
id (PK), member_id (FK), subject_id (FK), meeting_id (FK),
feedback_type (enum: 'theory', 'lab'),
raw_feedback (text), polished_feedback (text),
is_locked (boolean), submitted_at
```

### `general_feedback`
```
id (PK), member_id (FK), meeting_id (FK),
raw_feedback (text), polished_feedback (text),
is_locked (boolean), submitted_at
```

### `meeting_summary`
```
id (PK), meeting_id (FK → meetings.id),
summarized_general_feedback (text) — AI combined output,
generated_document_path (varchar),
generated_at
```

### Relationships
```
meetings (1) ── (many) subjects
meetings (1) ── (many) member_subject_assignment
meetings (1) ── (many) responses
meetings (1) ── (many) general_feedback
meetings (1) ── (1)    meeting_summary

members (1) ── (many) responses
members (1) ── (many) general_feedback
members (1) ── (many) member_subject_assignment

subjects (1) ── (many) responses
subjects (1) ── (many) member_subject_assignment
```

---

## 6. Application Flow

### Member flow
```
Visit "/" → Login (roll number + password)
    → Portal closed?  → "Check back later" screen
    → Portal open?    → Dashboard:
        - Assigned subject: theory feedback (+ lab feedback if applicable)
        - General feedback (non-academic)
        - Each section: fill → submit → confirmation popup → locked
```

### Admin flow
```
Visit "/admin" → Login
    → Dashboard:
        - Manage members (add / assign to subject / remove)
        - Manage subjects (add, mark has_lab, assign faculty)
        - Portal control (open / close toggle)
        - Live responses view (raw/polished toggle per entry)
        - Generate document (PDF — polished text)
        - Export CSV (prompts raw vs. polished)
```

### Feedback submission → AI polishing (real-time)
```
Student types raw feedback → clicks Submit → confirmation popup → confirms
    → Flask backend:
        1. Save raw_feedback to DB
        2. Call LLM API to polish the text
        3. Save polished_feedback to DB
        4. Mark is_locked = true
    → Admin sees polished version by default, can toggle to raw
```

### Document generation
```
Admin clicks "Generate Document"
    → General feedback entries → AI-summarized into one consolidated section
    → Subject-wise responses → polished versions compiled
    → Formatted into the college's standard CCM document structure
      (CCM member details, subject-wise comments, general points, action taken)
    → PDF generated (polished text only)
```

---

## 7. Frontend Structure (React)

```
src/
  ├── components/
  │   ├── MemberLogin.jsx      → route: "/"
  │   ├── AdminLogin.jsx       → route: "/admin"
  │   ├── MemberDashboard.jsx  → subject + general feedback, word-count validated
  │   ├── AdminDashboard.jsx   → (planned)
  │   └── ...
  ├── theme.js                 → shared color palette + shared input styles
  └── App.jsx                  → react-router-dom routing
```

**UI palette** (light theme, minimalist):

| Color | Hex | Usage |
|---|---|---|
| Cream | `#fefae0` | Page background |
| Dark green | `#283618` | Headings, admin accents |
| Olive | `#606c38` | Primary buttons, links |
| Tan | `#dda15e` | Secondary accent |
| Burnt orange | `#bc6c25` | Focus states, warnings, CTA highlights |

---

## 8. Progress Log

| Item | Status |
|---|---|
| Environment setup (MySQL, Flask, React) | ✅ Done |
| MySQL Server installed (Server Only) | ✅ Done |
| Flask + `mysql-connector-python` installed | ✅ Done |
| React project initialized | ✅ Done |
| `MemberLogin.jsx` | ✅ Done |
| `AdminLogin.jsx` | ✅ Done |
| `MemberDashboard.jsx` (with word-count limits + lock flow) | ✅ Done |
| `AdminDashboard.jsx` | 🔲 Not started |
| Flask API routes + auth | 🔲 Not started |
| MySQL schema creation (actual `CREATE TABLE`s) | 🔲 Not started |
| LLM API integration (polishing) | 🔲 Not started |
| PDF / CSV export | 🔲 Not started |
| Portal open/close toggle (backend logic) | 🔲 Not started |
| Git version control setup | 🔲 Not started |

---

## 9. Known Issues & Fixes (Reference)

- **"Invalid hook call" / `useRef` null error** — caused by duplicate/mismatched React copies in `node_modules`. Fixed by deleting `node_modules` + `package-lock.json` and running a fresh `npm install`.
- **Import path errors when moving components into `src/components/`** — remember to update relative imports (e.g., `./theme` → `../theme`) since `theme.js` lives one level up in `src/`.

---

## 10. Open / Upcoming Decisions

- LLM API provider not yet finalized (Claude API, OpenAI, etc.)
- Admin dashboard page design — not yet built
- Whether member submission order (theory → lab → general) needs enforcing or can be done in any order
