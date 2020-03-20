from marshmallow import Schema, fields
from flask_restful import Resource
from services import validate_json
import services.template.srvc as srvc


class _Template(Schema):
  text = fields.Str(required=True)
  symbols = fields.Dict(required=True)


class Create(Resource):

  @validate_json(_Template())
  def post(self, data):
    return {"text": srvc.build_template(data["symbols"], data["text"])}


class Apply(Resource):

  @validate_json(_Template())
  def post(self, data):
    return {"text": srvc.apply_template(data["symbols"], data["text"])}
