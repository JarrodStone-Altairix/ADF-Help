from marshmallow import Schema, fields
from flask import request
from flask_restful import Resource
from services import validate_json
import services.sub.srvc as srvc


class _Substitute(Schema):
  text = fields.Str(required=True)
  find = fields.Str(required=True)
  replace = fields.Str(required=True)


class Substitute(Resource):

  @validate_json(_Substitute())
  def post(self, data):
    find = srvc.to_token_list(data["find"])
    replace = srvc.to_token_list(data["replace"])

    return {"text": srvc.replace_case(find, replace, data["text"])}


class Case(Resource):

  case_switch = {
      "pascal": srvc.to_pascal,
      "camel": srvc.to_camel,
      "const": srvc.to_const,
  }

  def post(self):
    args = request.get_json()

    text = srvc.to_const(args["text"]) \
        if srvc.const_pttrn.match(args["text"]) \
        else args["text"]

    return {"text": Case.case_switch[args["case"]](text)}
