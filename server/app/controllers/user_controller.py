from flask import request, jsonify
import pymysql
from app.models.db import get_db_connection

class UserController:
    def __init__(self, db_connection):
        self.conn = db_connection

    # --- Sign-up API ---
    def signup(self):
        try:
            data = request.get_json()
            fullName = data.get('fullName')
            email = data.get('email')
            password = data.get('password')
            
            if not all([fullName, email, password]):
                return jsonify({'success': False, 'message': 'All fields (fullName, email, password) are required.'}), 400

            if len(fullName) < 3:
                return jsonify({'success': False, 'message': 'Full name should be at least 3 characters.'}), 400

            if len(password) < 8:
                return jsonify({'success': False, 'message': 'Password should be at least 8 characters.'}), 400

            with self.conn.cursor() as cursor:
                cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
                existed_user = cursor.fetchone()
                if existed_user:
                    return jsonify({'success': False, 'message': 'Account with this email already exists.'}), 409
                cursor.execute(
                    "INSERT INTO users (fullName, email, password) VALUES (%s, %s, %s)",
                    (fullName, email, password)
                )
                self.conn.commit()
                return jsonify({'success': True, 'message': 'User registered successfully!'}), 201

        except pymysql.Error as e:
            self.conn.rollback()
            print(f"Database error during signup: {e}")
            return jsonify({'success': False, 'message': 'Database error during signup.'}), 500
        except Exception as e:
            print(f"An unexpected error occurred during signup: {e}")
            return jsonify({'success': False, 'message': 'An unexpected error occurred. Please try again.'}), 500

    # --- Login API ---
    def login(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')

            if not all([email, password]):
                return jsonify({'success': False, 'message': 'Email and password are required.'}), 400

            cursor = self.conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT id, password FROM users WHERE email = %s", (email,))
            check_user = cursor.fetchone()
            cursor.close()

            if not check_user:
                return jsonify({'success': False, 'message': 'Invalid credentials.'}), 401

            stored_password = check_user['password']
            if stored_password == password:
                return jsonify({'success': True, 'message': 'Login successful!', 'user_id': check_user['id']}), 200
            else:
                return jsonify({'success': False, 'message': 'Invalid credentials.'}), 401

        except pymysql.Error as e:
            print(f"Database error during login: {e}")
            return jsonify({'success': False, 'message': 'Database error occurred.'}), 500
        except Exception as e:
            print(f"Unexpected error during login: {e}")
            return jsonify({'success': False, 'message': 'Login failed. Please try again.'}), 500

    # --- Get email and fullName API ---
    def dataExtraction(self, user_id=None):
        try:
            if not user_id:
                return jsonify({'success': False, 'message': 'User ID is required.'}), 400

            cursor = self.conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT id, email, fullName FROM users WHERE id = %s", (user_id,))
            user_data = cursor.fetchone()
            cursor.close()

            if user_data:
                return jsonify({
                    'success': True,
                    'user': {
                        'id': user_data['id'],
                        'email': user_data['email'],
                        'fullName': user_data['fullName']
                    }
                }), 200
            else:
                return jsonify({'success': False, 'message': 'User not found.'}), 404

        except pymysql.Error as e:
            print(f"Database error: {e}")
            return jsonify({'success': False, 'message': f'Database error occurred: {e}'}), 500
        except Exception as e:
            print(f"Unexpected error: {e}")
            return jsonify({'success': False, 'message': f'Request failed. Please try again. Error: {e}'}), 500

    # --- Reset Password API ---
    def reset_password(self, user_id, email, new_password):
        try:
            if not all([user_id, email, new_password]):
                return jsonify({'success': False, 'message': 'All fields (user_id, email, new_password) are required'}), 400

            if len(new_password) < 8:
                return jsonify({'success': False, 'message': 'New password must be at least 8 characters'}), 400

            cursor = self.conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT id, email FROM users WHERE id = %s", (user_id,))
            user = cursor.fetchone()

            if not user:
                cursor.close()
                return jsonify({'success': False, 'message': 'User not found'}), 404

            if user['email'] != email:
                cursor.close()
                return jsonify({'success': False, 'message': 'Email does not match our records for this user ID'}), 401
            cursor.execute("UPDATE users SET password = %s WHERE id = %s",
                           (new_password, user_id))
            self.conn.commit()
            cursor.close()

            return jsonify({'success': True, 'message': 'Password updated successfully'}), 200

        except pymysql.Error as e:
            self.conn.rollback()
            print(f"Database error during password reset: {e}")
            return jsonify({'success': False, 'message': 'Database error during password reset.'}), 500
        except Exception as e:
            print(f"Unexpected error during password reset: {e}")
            return jsonify({'success': False, 'message': 'Password reset failed. Please try again.'}), 500
