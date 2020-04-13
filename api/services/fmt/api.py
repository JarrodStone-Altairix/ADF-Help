from marshmallow import Schema, fields
from flask_restful import Resource
from services import validate_json
from services.fmt import srvc as fmt


class _Table(Schema):
  text = fields.Str(required=True)


class Table(Resource):

  @validate_json(_Table())
  def post(self, data):

    return {"text": fmt.format_table(data["text"])}


class _Pivot(Schema):
  text = fields.Str(required=True)
  pivot = fields.Str(required=True)


class Pivot(Resource):

  @validate_json(_Pivot())
  def post(self, data):

    return {
        "text": fmt.format_pivot(data["text"], data["pivot"])}
