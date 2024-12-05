from app import app
from flask import render_template, abort
import json

def get_data():
    with open('app/corps.json') as file:
        data = json.load(file)
    return {d['title'] : d['content'] for d in data}

@app.route('/')
@app.route('/index.html')
def index():
    return render_template("index.html", collection=get_data().keys())

@app.route('/podcast.html')
def podcast():
    return render_template("podcast.html", collection=get_data().keys())

@app.route('/about.html')
def about():
    return render_template("about.html", collection=get_data().keys())

@app.route('/<partie>.html')
def corps(partie):
    return render_template("corps.html", element=partie, desc = get_data()[partie], collection=get_data().keys())