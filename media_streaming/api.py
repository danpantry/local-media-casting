import flask
import pychromecast
from . import db


bp = flask.Blueprint('api', 'api', url_prefix='/api')


def find_tv(casts):
    return [c for c in casts
            if c.device.friendly_name == 'Family room TV'][0]

@bp.route('/films')
def list_films():
    films = [to_view_model(film, flask) for film in db.list_films()]
    return flask.jsonify(films)

def to_view_model(film: dict, flask: flask.Flask):
    return {
        "id": film['id'],
        "cast_url": flask.url_for('.cast', film_id=film['id']),
        "name": film['name']
    }

@bp.route('/cast/<string:film_id>')
def cast(film_id):
    film = db.find_film_by_id(id)
    if film == None:
        return flask.Response(status=404)

    tv = find_tv(pychromecast.get_chromecasts())
    tv.play_media('http://192.168.0.241:3000/stream', 'video/mp4')
    return flask.make_response("Ok!", 200)
