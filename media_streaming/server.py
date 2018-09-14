import flask
import pychromecast
from . import db


app = flask.Flask(__name__)

def find_tv(casts):
    return [c for c in casts
            if c.device.friendly_name == 'Family room TV'][0]


def to_view_model(film: dict, flask: flask.Flask):
    return {
        "id": film['id'],
        "cast_url": flask.url_for('.cast', film_id=film['id']),
        "name": film['name']
    }

@app.route('/', strict_slashes=False)
def library():
    print(to_view_model(db.list_films()[0], flask))
    return flask.render_template(
        'library.html.jinja',
        entries=[to_view_model(film, flask) for film in db.list_films()]
    )


@app.route('/cast/<string:film_id>')
def cast(film_id):
    film = db.find_film_by_id(id)
    if film == None:
        return flask.Response(status=404)

    tv = find_tv(pychromecast.get_chromecasts())
    tv.play_media('http://192.168.0.241:3000/stream', 'video/mp4')
    return flask.make_response("Ok!", 200)
