from flask import Flask, session, redirect, url_for, escape, request, jsonify, g

import sqlite3

app = Flask(__name__)

DATABASE = 'db'

def connect_db():
	return sqlite3.connect(DATABASE)

def get_db():
	db = getattr(g, '_database', None)
	if db is None:
		db = g._database = connect_db()
	return db

def query_db(query, args=(), one=False):
	cur = get_db().execute(query, args)
	get_db().commit()
	rv = [dict((cur.description[idx][0], value)
			for idx, value in enumerate(row)) for row in cur.fetchall()]
	return (rv[0] if rv else None) if one else rv

@app.teardown_appcontext
def close_connection(exception):
	db = getattr(g, '_database', None)
	if db is not None:
		db.close()

def init_db():
	with app.app_context():
		db = get_db()
		with app.open_resource('create_db.sql', mode='r') as f:
			db.cursor().executescript(f.read())
		db.commit()

@app.route('/register', methods=['POST'])
def register():
	if request.method == 'POST':
		if request.form['request'] == "REGISTER":
			name = request.form['name']
			lat = request.form['lat']
			lon = request.form['lon']
			query = """INSERT INTO nodes(name, lat, lon)
			values (?, ?, ?)"""
                        try:
			    query_db(query, (name, lat, lon))
                        except:
                            return "already registered"
			return "success"

@app.route('/freq', methods=['GET','POST'])
def freq():
	if request.method == 'GET':
		return jsonify(query_db("SELECT freq from current_state WHERE id=1")[0])
	if request.method == 'POST':
		if request.form['freq']:
			query = """UPDATE current_state
			SET freq = ? WHERE id=1 """
			query_db(query, (request.form['freq'],))
			return "success"


@app.route('/mode', methods=['GET','POST'])
def mode():
	if request.method == 'GET':
		return jsonify(query_db("SELECT mode from current_state WHERE id=1")[0])
	if request.method == 'POST':
		if request.form['mode']:
			query = """UPDATE current_state
			SET mode = ? WHERE id=1 """
			query_db(query, (request.form['mode'],))
			return "success"

@app.route('/gain', methods=['GET','POST'])
def gain():
	if request.method == 'GET':
		return jsonify(query_db("SELECT gain from current_state WHERE id=1")[0])
	if request.method == 'POST':
		if request.form['gain']:
			query = """UPDATE current_state
			SET gain = ? WHERE id=1 """
			query_db(query, (request.form['gain'],))
			return "success"

@app.route('/ping', methods=['GET'])
def ping():
	if request.method == 'GET':
		return jsonify(query_db("SELECT * from current_state WHERE id=1")[0])

@app.route('/heading', methods=['POST'])
def heading():
	if request.method == 'POST':
		name = request.form['name']
		heading = request.form['heading']
		query = """UPDATE nodes
				SET heading = ?
				WHERE name= ?"""
		query_db(query, (heading, name))
		return "success"

@app.route('/current', methods=['GET'])
def current():
	if request.method == 'GET':
		rtrn =  query_db("SELECT * from nodes")
		return jsonify(current=rtrn)


@app.route('/delete', methods=['POST'])
def delete():
	if request.method == 'POST':
		name = request.form['name']
		query = """ DELETE from nodes where name = ? """
		query_db(query, (name,))
		return "success"

@app.errorhandler(500)
def internal_error(error):
	print error

init_db()
if __name__ == '__main__':
    app.run(host='0.0.0.0')

