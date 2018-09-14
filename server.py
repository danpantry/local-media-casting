import flask
import io

app = flask.Flask(__name__)


@app.route('/stream')
def show_video():
    fd = open('./fantastic_beasts.mp4', 'rb')
    return flask.Response(fd, mimetype='video/mp4')

if __name__ == '__main__':
    app.run()

