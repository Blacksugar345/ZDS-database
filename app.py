from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Database helper
def get_db_connection():
    conn = sqlite3.connect('staff.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    return render_template('index.html')

# --- API endpoints ---
@app.route('/api/staff/<staff_id>', methods=['GET'])
def get_staff(staff_id):
    conn = get_db_connection()
    staff = conn.execute('SELECT * FROM staff WHERE id = ? OR codename = ?', (staff_id, staff_id)).fetchone()
    conn.close()
    if staff:
        return jsonify(dict(staff))
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/package/<pkg_id>', methods=['GET'])
def get_package(pkg_id):
    conn = get_db_connection()
    pkg = conn.execute('SELECT * FROM packages WHERE id = ?', (pkg_id,)).fetchone()
    conn.close()
    if pkg:
        return jsonify(dict(pkg))
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
