import re

pascal_pttrn = re.compile(r"^[A-Z][a-zA-Z0-9_]+$")
camel_pttrn = re.compile(r"^[a-z][a-zA-Z0-9_]+$")
const_pttrn = re.compile(r"^[A-Z][A-Z0-9_]+$")
css_pttrn = re.compile(r"^[a-zA-Z]+-[a-zA-Z-]*$")
# css_pttrn = re.compile(r"^[a-z](\-[a-z\-])*$")


def to_token_list(text):
  """
  String is assumed to not have any spaces
  """
  if const_pttrn.match(text) is not None:
    text = text.replace("_", " ").lower()
  elif pascal_pttrn.match(text) is not None:
    text = re.sub(r"(.)([A-Z])", r"\1 \2", text).lower()
  elif camel_pttrn.match(text) is not None:
    text = re.sub(r"([a-z])([A-Z])", r"\1 \2", text).lower()
  elif css_pttrn.match(text) is not None:
    text = text.replace("-", " ").lower()
  else:
    return [text]

  return text.split(" ")


def to_pascal(tokens):
  return "".join([t[0].upper() + t[1:] for t in tokens])


def to_camel(tokens):
  return tokens[0] + "".join([t[0].upper() + t[1:] for t in tokens[1:]])


def to_const(tokens):
  return "_".join([t.upper() for t in tokens])


def to_css(tokens):
  return "-".join([t.lower() for t in tokens])


def get_sub_funcs():
  return [to_pascal, to_camel, to_const, to_css]


def replace_case(find_tokens, replace_tokens, text):

  for sub_func in get_sub_funcs():
    k = sub_func(find_tokens)
    v = sub_func(replace_tokens)
    text = text.replace(k, v)

  return text
