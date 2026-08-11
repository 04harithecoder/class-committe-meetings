from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes.auth import auth_bp

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

# Allow the React dev server (Vite, default port 5173) to call this API
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

jwt = JWTManager(app)

app.register_blueprint(auth_bp)


@app.route("/api/health", methods=["GET"])
def health_check():
    return {"status": "ok"}, 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
