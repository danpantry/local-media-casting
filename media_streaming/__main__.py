import flask
from .api import bp

app = flask.Flask(__name__)
app.register_blueprint(bp)

app.run()
