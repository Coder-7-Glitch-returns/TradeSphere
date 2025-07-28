from .controllers.user_controller import UserController
from .models.db import get_db_connection
from .models.schemas import create_user_table
from flask import request

def init_routes(app):
    db_connection = get_db_connection()
    create_user_table(db_connection)
    user_controller = UserController(db_connection)
    
    # --- SignUp API ---
    @app.route('/api/signup', methods=['POST'])
    def signup():
        return user_controller.signup()
    
    # --- Login API ---
    @app.route('/api/login', methods=['POST'])
    def login():
        return user_controller.login()
    
    # --- Data Extraction API ---   
    @app.route('/api/data/<int:user_id>', methods=['GET'])
    def get_user_data(user_id):
        return user_controller.dataExtraction(user_id)
    
    # --- Reset Password API ---
    @app.route('/api/reset-password/<int:user_id>', methods=['PUT'])
    def reset_password(user_id):
        data = request.get_json()
        new_password = data.get('new_password')
        email = data.get('email')
        return user_controller.reset_password(user_id, email, new_password)