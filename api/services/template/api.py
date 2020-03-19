from marshmallow import Schema, fields
from flask_restful import Resource
from services import validate_json
import services.template.srvc as srvc


class _Create(Schema):

  class _Pair(Schema):
    search = fields.Str(required=True)
    template = fields.Str(required=True)

  text = fields.Str(required=True)
  pairs = fields.List(fields.Nested(_Pair), required=True)


class Create(Resource):

  @validate_json(_Create())
  def post(self, data):

    # Remove empty pairs
    pairs = filter(
        lambda p: len(p["search"]) > 0 and len(p["template"]) > 0,
        data["pairs"])

    return {"text": srvc.build_template(pairs, data["text"])}


class _Apply(Schema):

  text = fields.Str(required=True)
  symbols = fields.Dict(required=True)


class Apply(Resource):

  @validate_json(_Apply())
  def post(self, data):
    return {"text": srvc.apply_template(data["symbols"], data["text"])}
