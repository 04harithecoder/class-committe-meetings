from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt
from db import get_db_connection
from decorators import role_required

subjects_bp = Blueprint("subjects", __name__, url_prefix="/api/teacher")


@subjects_bp.route("/available-members", methods=["GET"])
@role_required("teacher")
def available_members():
    """
    Returns members not yet linked to any subject, split by gender,
    so the frontend can populate the male/female dropdowns.
    """
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            """
            SELECT id, roll_number, name, gender FROM members
            WHERE id NOT IN (
                SELECT male_member_id FROM subjects
                UNION
                SELECT female_member_id FROM subjects
            )
            ORDER BY name
            """
        )
        members = cursor.fetchall()
    finally:
        cursor.close()
        conn.close()

    males = [m for m in members if m["gender"] == "male"]
    females = [m for m in members if m["gender"] == "female"]

    return jsonify({"males": males, "females": females}), 200


@subjects_bp.route("/subjects", methods=["POST"])
@role_required("teacher")
def create_subject():
    from flask_jwt_extended import get_jwt_identity

    data = request.get_json(silent=True) or {}
    subject_name = data.get("subject_name", "").strip()
    subject_code = data.get("subject_code", "").strip()
    has_lab = bool(data.get("has_lab", False))
    male_member_id = data.get("male_member_id")
    female_member_id = data.get("female_member_id")

    if not subject_name or not male_member_id or not female_member_id:
        return jsonify(
            {"error": "Subject name, a male member, and a female member are required."}
        ), 400

    teacher_id = get_jwt_identity()

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO subjects
                (subject_name, subject_code, has_lab, teacher_id, male_member_id, female_member_id)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (subject_name, subject_code, has_lab, teacher_id, male_member_id, female_member_id),
        )
        conn.commit()
        new_id = cursor.lastrowid
    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Could not create subject: {str(e)}"}), 400
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "Subject created.", "subject_id": new_id}), 201


@subjects_bp.route("/subjects", methods=["GET"])
@role_required("teacher")
def list_my_subjects():
    from flask_jwt_extended import get_jwt_identity

    teacher_id = get_jwt_identity()

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            """
            SELECT s.id, s.subject_name, s.subject_code, s.has_lab,
                   m1.name AS male_member_name, m1.roll_number AS male_roll_number,
                   m2.name AS female_member_name, m2.roll_number AS female_roll_number
            FROM subjects s
            JOIN members m1 ON s.male_member_id = m1.id
            JOIN members m2 ON s.female_member_id = m2.id
            WHERE s.teacher_id = %s
            ORDER BY s.created_at DESC
            """,
            (teacher_id,),
        )
        subjects = cursor.fetchall()
    finally:
        cursor.close()
        conn.close()

    return jsonify({"subjects": subjects}), 200