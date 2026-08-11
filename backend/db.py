import mysql.connector
from mysql.connector import Error
from config import Config


def get_db_connection():
    """
    Opens and returns a new MySQL connection.
    Caller is responsible for closing it (or use the `with` pattern below).
    """
    try:
        connection = mysql.connector.connect(
            host=Config.DB_HOST,
            user=Config.DB_USER,
            password=Config.DB_PASSWORD,
            database=Config.DB_NAME,
        )
        return connection
    except Error as e:
        print(f"[DB ERROR] Could not connect to MySQL: {e}")
        raise
