import flask
from . import db
from . import devices


bp = flask.Blueprint('api', 'api', url_prefix='/api')


def find_tv(casts):
    return [c for c in casts
            if c.device.friendly_name == 'Family room TV'][0]


@bp.route('/films/<string:film_id>')
def find_film(film_id):
    film = db.find_film_by_id(film_id)

    if film == None:
        return flask.Response(status=404)

    return flask.jsonify(film.to_json())


@bp.route('/films')
def list_films():
    return flask.jsonify([
        film.to_json() for film in db.list_films()
    ])


def to_view_model(film: dict, flask: flask.Flask):
    return {
        "id": film['id'],
        "cast_url": flask.url_for('.cast', film_id=film['id']),
        "name": film['name']
    }


@bp.route('/devices')
def list_devices():
    return flask.jsonify([
        device.to_json() for device in devices.list()
    ])


@bp.route('/cast/<string:film_id>')
def cast(film_id):
    film = db.find_film_by_id(id)
    if film == None:
        return flask.Response(status=404)

    tv.play_media('http://192.168.0.241:3000/stream', 'video/mp4')
    return flask.make_response("Ok!", 200)
