from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from db import get_db_connection

auth_bp = Blueprint("auth", __name__, url_prefix="/api")


@auth_bp.route("/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT id, username, password_hash, name FROM admins WHERE username = %s",
            (username,),
        )
        admin = cursor.fetchone()
    finally:
        cursor.close()
        conn.close()

    if not admin or not check_password_hash(admin["password_hash"], password):
        return jsonify({"error": "Invalid username or password."}), 401

    access_token = create_access_token(
        identity=str(admin["id"]),
        additional_claims={"role": "admin", "name": admin["name"]},
    )

    return jsonify(
        {
            "access_token": access_token,
            "role": "admin",
            "name": admin["name"],
        }
    ), 200


@auth_bp.route("/teacher/login", methods=["POST"])
def teacher_login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT id, username, password_hash, name FROM teachers WHERE username = %s",
            (username,),
        )
        teacher = cursor.fetchone()
    finally:
        cursor.close()
        conn.close()

    if not teacher or not check_password_hash(teacher["password_hash"], password):
        return jsonify({"error": "Invalid username or password."}), 401

    access_token = create_access_token(
        identity=str(teacher["id"]),
        additional_claims={"role": "teacher", "name": teacher["name"]},
    )

    return jsonify(
        {
            "access_token": access_token,
            "role": "teacher",
            "name": teacher["name"],
        }
    ), 200


@auth_bp.route("/member/login", methods=["POST"])
def member_login():
    data = request.get_json(silent=True) or {}
    roll_number = data.get("roll_number", "").strip()
    password = data.get("password", "")

    if not roll_number or not password:
        return jsonify({"error": "Roll number and password are required."}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT id, roll_number, password_hash, name FROM members WHERE roll_number = %s",
            (roll_number,),
        )
        member = cursor.fetchone()
    finally:
        cursor.close()
        conn.close()

    if not member or not check_password_hash(member["password_hash"], password):
        return jsonify({"error": "Invalid roll number or password."}), 401

    access_token = create_access_token(
        identity=str(member["id"]),
        additional_claims={"role": "member", "name": member["name"]},
    )

    return jsonify(
        {
            "access_token": access_token,
            "role": "member",
            "name": member["name"],
        }
    ), 200