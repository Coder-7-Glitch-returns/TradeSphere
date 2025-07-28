import pymysql

def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='',
        database='tradesphere_form_db',
        cursorclass=pymysql.cursors.DictCursor
    )