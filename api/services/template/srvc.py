import re
import services.sub.srvc as srvc_sub

template_pattern = re.compile(r"\${(.+?)}")


def build_template(symbol_map, text):

  for s, t in symbol_map.items():
    search_tokens = srvc_sub.to_token_list(s)
    template_tokens = srvc_sub.to_token_list(t)

    sub_map = {
        k: f"${{{v}}}" for k, v
        in srvc_sub.get_subtitution_map(search_tokens, template_tokens).items()
    }

    for k, v in sub_map.items():
      text = text.replace(k, v)

  return text


def get_symbols(text):

  pascalSymbols = [
      srvc_sub.to_pascal(srvc_sub.to_token_list(m.group(1)))
      for m in template_pattern.finditer(text)]

  if len(pascalSymbols) == 1:
    return pascalSymbols

  pascalSymbols.sort()
  ret = [pascalSymbols[0]]

  for a, b in zip(pascalSymbols, pascalSymbols[1:]):
    if a != b:
      ret.append(b)

  return ret


def apply_template(symbols, template):

  for t, s in symbols.items():
    template_tokens = srvc_sub.to_token_list(t)
    symbol_tokens = srvc_sub.to_token_list(s)

    sub_map = {
        f"${{{k}}}": v for k, v
        in srvc_sub.get_subtitution_map(template_tokens, symbol_tokens).items()
    }

    for k, v in sub_map.items():
      template = template.replace(k, v)

  return template
