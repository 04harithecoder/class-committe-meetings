"""
One-time helper to create a test admin and a test member so you can try
logging in before the "Manage Members" admin page is built.

Run: python create_test_users.py
"""
from werkzeug.security import generate_password_hash
from db import get_db_connection

conn = get_db_connection()
cursor = conn.cursor()

# --- Test admin ---
admin_username = "admin"
admin_password = "admin123"  # change this after first login, in real use
admin_name = "Hariharan"

cursor.execute(
    "INSERT INTO admins (username, password_hash, name) VALUES (%s, %s, %s)",
    (admin_username, generate_password_hash(admin_password), admin_name),
)

# --- Test member ---
member_roll = "21CS045"
member_password = "member123"
member_name = "Priya S"

cursor.execute(
    "INSERT INTO members (roll_number, password_hash, name) VALUES (%s, %s, %s)",
    (member_roll, generate_password_hash(member_password), member_name),
)

conn.commit()
cursor.close()
conn.close()

print("Test users created:")
print(f"  Admin  -> username: {admin_username}  password: {admin_password}")
print(f"  Member -> roll_number: {member_roll}  password: {member_password}")
