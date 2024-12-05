from app import app
from flask import render_template

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/podcast')
def podcast():
    return render_template("podcast.html")

@app.route('/about')
def about():
    return render_template("about.html")