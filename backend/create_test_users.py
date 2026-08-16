"""
One-time helper to create test accounts for all 3 roles so you can try
logging in before the full admin/teacher UI is built.

Run: python create_test_users.py

Safe to re-run only if you first clear the tables -- running twice as-is
will fail on the UNIQUE constraints (username/roll_number already exist).
"""
from werkzeug.security import generate_password_hash
from db import get_db_connection

conn = get_db_connection()
cursor = conn.cursor()

# --- Test admin ---
cursor.execute(
    "INSERT INTO admins (username, password_hash, name) VALUES (%s, %s, %s)",
    ("admin", generate_password_hash("admin123"), "Hariharan"),
)

# --- Test teacher ---
cursor.execute(
    "INSERT INTO teachers (username, password_hash, name, department) VALUES (%s, %s, %s, %s)",
    ("teacher1", generate_password_hash("teacher123"), "Dr. R. Kumar", "CSE"),
)

# --- Test members (need one male + one female for subject creation to work) ---
cursor.execute(
    "INSERT INTO members (roll_number, name, password_hash, gender) VALUES (%s, %s, %s, %s)",
    ("21CS045", "Priya S", generate_password_hash("member123"), "female"),
)
cursor.execute(
    "INSERT INTO members (roll_number, name, password_hash, gender) VALUES (%s, %s, %s, %s)",
    ("21CS046", "Arjun M", generate_password_hash("member123"), "male"),
)

conn.commit()
cursor.close()
conn.close()

print("Test users created:")
print("  Admin   -> username: admin       password: admin123")
print("  Teacher -> username: teacher1    password: teacher123")
print("  Member  -> roll_number: 21CS045  password: member123  (female)")
print("  Member  -> roll_number: 21CS046  password: member123  (male)")