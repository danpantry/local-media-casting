import flask
from .api import bp

app = flask.Flask(__name__)
app.config['SERVER_NAME'] = '192.168.0.241:5000'
app.register_blueprint(bp)
app.run()
