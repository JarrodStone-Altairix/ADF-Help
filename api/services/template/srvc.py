import re
import services.sub.srvc as srvc_sub

template_pattern = re.compile(r"\@{(.+?)}")


def build_template(symbol_map, text):

  for s, t in symbol_map.items():
    s_tok = srvc_sub.to_token_list(s)
    t_tok = srvc_sub.to_token_list(t)

    sub_map = {
        sub_func(s_tok): f"@{{{sub_func(t_tok)}}}"
        for sub_func in srvc_sub.get_sub_funcs()
    }

    for k, v in sub_map.items():
      text = text.replace(k, v)

  return text


def get_symbols(text):

  pascalSymbols = [
      srvc_sub.to_pascal(srvc_sub.to_token_list(m.group(1)))
      for m in template_pattern.finditer(text)]

  if len(pascalSymbols) <= 1:
    return pascalSymbols

  pascalSymbols.sort()
  ret = [pascalSymbols[0]]

  for a, b in zip(pascalSymbols, pascalSymbols[1:]):
    if a != b:
      ret.append(b)

  return ret


def apply_template(symbols, template):

  for t, s in symbols.items():
    t_tok = srvc_sub.to_token_list(t)
    s_tok = srvc_sub.to_token_list(s)

    sub_map = {
        f"@{{{sub_func(t_tok)}}}": sub_func(s_tok)
        for sub_func in srvc_sub.get_sub_funcs()
    }

    for k, v in sub_map.items():
      template = template.replace(k, v)

  return template
