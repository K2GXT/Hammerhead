from flask import Flask, session, redirect, url_for, escape, request

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
	if request.method == 'POST':
		print request.form['request']


if __name__ == '__main__':
    app.run(host='0.0.0.0')
