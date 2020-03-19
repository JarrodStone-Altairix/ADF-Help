import ix.regex as ixre


def test_token(text):
  print(", ".join(ixre.to_token_list(text)))


test_token("lower-Upper-Upper")
