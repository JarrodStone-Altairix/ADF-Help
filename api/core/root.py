from config.flask import Config as Cfg
from flask import Flask
from flask_restful import Api

app = Flask(__name__)
app.config.from_object(Cfg)

api = Api(app)
