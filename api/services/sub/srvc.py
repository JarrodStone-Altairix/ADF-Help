import re

# _line_pttrn = re.compile(os.linesep)
_line_pttrn = re.compile("\n")
_to_constPattern = re.compile(r"([a-z])([A-Z])")

pascal_pttrn = re.compile(r"^[A-Z][a-zA-Z0-9_]+$")
camel_pttrn = re.compile(r"^[a-z][a-zA-Z0-9_]+$")
const_pttrn = re.compile(r"^[A-Z][A-Z0-9_]+$")


def to_pascal(text):
  return text[0].upper() + text[1:]


def to_camel(text):
  return text[0].lower() + text[1:]


def to_const(text):
  text, _ = _to_constPattern.subn(r"\1_\2", text)
  return text.upper()


def to_css(text):
  return _to_constPattern.sub(r"\1-\2", text)


def from_const(text):
  return "".join([s[0].upper() + s[1:].lower() for s in text.split("_")])


def to_template(text):
  return f"~@{{{text}}}"


def to_template_dict(key, value):
  return {
      to_template(to_pascal(key)): to_pascal(value),
      to_template(to_camel(key)): to_camel(value),
      to_template(to_const(key)): to_const(value)
  }


def to_fmt_dict(key, value):
  return {
      to_pascal(key): to_pascal(value),
      to_camel(key): to_camel(value),
      to_const(key): to_const(value)
  }


def get_line_number(position, text):
  return len(_line_pttrn.findall(text, 0, position)) + 1


def subkv(subs, text):
  """Takes a dictionary of substitution map and applies them
  to the text

  Params:
    subs: dict{k:v}
      substitutions to be made
    text: str
      texts to be substituted"""

  for k, v in subs.items():
    text = text.replace(k, v)
  return text


def subf(subs, text):
  """Makes substitutions looking for the ~@{key} and replaces with the
  associated value. Matches on pascal case, camel case and upper case keys.
  For example:
    ~@{keyCamel} -> valueCamel
    ~@{KeyCamel} -> ValueCamel
    ~@{KEY_CAMEL} -> VALUE_CAMEL

  Params:
    text: str
      Text to be replaced
    substitutions: dict{k:v}
      dictionary of keys and values to be replaced. keys should be provided in
      camel case or pascal case and the brackets will be added as part of the
      search."""
  for key, value in subs.items():
    fmt_subs = to_template_dict(key, value)
    text = subkv(fmt_subs, text)

  return text
