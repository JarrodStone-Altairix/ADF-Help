import logging
from functools import wraps
from marshmallow import ValidationError
# from core.logger import app_handler
from flask import abort, request
# from flask_jwt_extended import get_jwt_identity
# from core.logger import set_arg_logging

logger = logging.getLogger(__name__)


class validate_json(object):
  """
  A decorator to parse a json request into a marshmallow schema
  """

  def __init__(self, schema):
    self.schema = schema

  def __call__(self, fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
      return fn(*args, **kwargs, data=validate_json_in_request(self.schema))
    return wrapper


def validate_json_in_request(schema):
  try:
    return schema.load(request.get_json())
  except ValidationError as e:
    logger.warn(
        f"Schema validation error({_validation_err_repr(e)})")
    abort(400, e.messages)
  except Exception as e:
    logger.critical(f"Unknown error({str(e)})")
    abort(500)


def _validation_err_repr(e):
  return "; ".join([
      f"{k}: [{' '.join(v)}]"
      for k, v in e.messages.items()])


class log_exceptions(object):
  """
  Decorator class to catch all exceptions and log them
  """

  def __init__(self, log_req_args=True, log_rsp_args=True):
    self.log_req_args = log_req_args
    self.log_rsp_args = log_rsp_args

  def __call__(self, fn):

    @wraps(fn)
    def log_exception_wrapper(*args, **kwargs):
      set_arg_logging(self.log_req_args, self.log_rsp_args)
      try:
        return fn(*args, **kwargs)
      except Exception as e:
        logger.critical(f"Unknown error({str(e)})", exc_info=True)
        abort(500)

    return log_exception_wrapper


def simple_response(http_code, msg):
  return {"msg": msg}, http_code


# def fmt_msg(msg):
#   return (
#       f"User({get_jwt_identity()}) "
#       f"Arguments[{request.get_json()}] --- " + msg)


# def warning_response(log, http_code, msg):
#   """
#   Macro to log a warning message and return a response object with an
#   http code and message
#   """
#   msg_full = fmt_msg(msg)
#   log.warning(msg_full)
#   return simple_response(http_code, msg)


# def error_response(log, http_code, msg):
#   """
#   Macro to log a error message and return a response object with an
#   http code and message
#   """
#   msg_full = fmt_msg(msg)
#   log.error(msg_full)
#   return simple_response(http_code, msg)
