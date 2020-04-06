from marshmallow import Schema, fields, validate
from flask import send_file
from flask_restful import Resource
from services import validate_params
import services.builder.srvc as builder


class _Package(Schema):
  name = fields.Str(required=True, validate=validate.Length(1))


class Package(Resource):

  @validate_params(_Package())
  def get(self, data):

    return send_file(
        builder.build_module("package", {"Template": data["name"]}),
        as_attachment=True, attachment_filename=f"Package-{data['name']}.zip")
