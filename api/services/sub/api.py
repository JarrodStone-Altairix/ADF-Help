from flask import request
from flask_restful import Resource
import services.sub.srvc as srvc


class Substitute(Resource):
  def post(self):
    args = request.get_json()

    text = args["text"].replace(srvc.to_camel(args["find"]),
                                srvc.to_camel(args["replace"]))
    text = text.replace(srvc.to_pascal(args["find"]),
                        srvc.to_pascal(args["replace"]))
    text = text.replace(srvc.to_css(args["find"]),
                        srvc.to_css(args["replace"]))

    return {
        "text": text.replace(srvc.to_const(args["find"]),
                             srvc.to_const(args["replace"]))}


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
