import flask
import io
import pychromecast
import json


app = flask.Flask(__name__)


def find_tv(casts):
    return [c for c in device
            if c.device.friendly_name == 'Family room TV'][0]


@app.route('/start')
def start():
    tv = find_tv(pychromecast.get_chromecasts())
    tv.play_media('http://192.168.0.241:3000/stream', 'video/mp4')


@app.route('/stream')
def show_video():
    fd = io.open('./fantastic_beasts.mp4', 'rb')
    return flask.Response(fd, mimetype='video/mp4')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, threaded=True)
