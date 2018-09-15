import flask
from . import db
from . import devices


bp = flask.Blueprint('api', 'api', url_prefix='/api')


@bp.route('/films/<string:film_id>')
def find_film(film_id):
    film = db.find_film_by_id(film_id)

    if film is None:
        return flask.Response(status=404)

    return flask.jsonify(film.to_json())


@bp.route('/films')
def list_films():
    return flask.jsonify([
        film.to_json() for film in db.list_films()
    ])


@bp.route('/devices')
def list_devices():
    return flask.jsonify([
        device.to_json() for device in devices.list()
    ])


def find_device(device_id):
    if device_id == 'default':
        default_device = db.find_default_device()
        if default_device is None:
            return None

        return devices.find_by_id(
            default_device.device_id
        )

    return devices.find_by_id(device_id)


@bp.route('/films/<string:film_id>/stream')
def stream(film_id):
    film = db.find_film_by_id(film_id)
    if film is None:
        return flask.Response(status=404)

    stream, media_type = film.open()
    return flask.Response(stream, status=200, content_type=media_type)


@bp.route('/devices/<string:device_id>/cast/<string:film_id>', methods=['POST'])
def cast(device_id, film_id):
    device = find_device(device_id)
    if device is None:
        return flask.jsonify(
            object="device",
            error="not_found",
            id=device_id,
            message="The device could not be found",
            status=404
        )

    film = db.find_film_by_id(film_id)
    if film is None:
        return flask.jsonify(
            object="film",
            error="not_found",
            id=film_id,
            message="The film could not be found",
            status=404
        )
    url = flask.url_for('.stream', film_id=film_id, _external=True)
    device.play_media(url, 'video/mp4')
    return flask.jsonify(
        status="ok",
        device_id=device.id,
        film_id=film_id
    )
