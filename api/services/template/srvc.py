import re
import services.sub.srvc as srvc_sub

template_pattern = re.compile(r"${(.+?)}")


def build_template(template_pairs, text):

  for pair in template_pairs:
    search_tokens = srvc_sub.to_token_list(pair["search"])
    template_tokens = srvc_sub.to_token_list(pair["template"])

    sub_map = {
        k: f"${{{v}}}" for k, v
        in srvc_sub.get_subtitution_map(search_tokens, template_tokens).items()
    }

    for k, v in sub_map.items():
      text = text.replace(k, v)

  return text


def apply_template(template_args, template):

  for pair in template_args:
    template_tokens = srvc_sub.to_token_list(pair["template"])
    symbol_tokens = srvc_sub.to_token_list(pair["symbol"])

    sub_map = {
        f"${{{k}}}": v for k, v
        in srvc_sub.get_subtitution_map(template_tokens, symbol_tokens).items()
    }

    for k, v in sub_map.items():
      template = template.replace(k, v)

  return template
