from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt


def role_required(required_role):
    """
    Use this on any route that should only be reachable by a specific role.

    Example:
        @app.route("/api/admin/members", methods=["GET"])
        @role_required("admin")
        def list_members():
            ...
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims.get("role") != required_role:
                return jsonify({"error": "Forbidden: insufficient role."}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator
