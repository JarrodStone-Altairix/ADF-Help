import os

TEMPLATE_DIR = "services/gen/templates"

files = list(filter(
    lambda fp: os.path.isfile(os.path.join(TEMPLATE_DIR, fp)),
    os.listdir(TEMPLATE_DIR)))

print(files)
