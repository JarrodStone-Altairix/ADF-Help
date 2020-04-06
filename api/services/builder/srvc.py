import os
from io import BytesIO
from zipfile import ZipFile, ZIP_DEFLATED
import services.template.srvc as template

SRC_DIR = "services/builder/templates"


def build_module(package_dir, symbols):
  mem_file = BytesIO()
  zf = ZipFile(mem_file, mode="w", compression=ZIP_DEFLATED)

  for root, dirs, files in os.walk(os.path.join(SRC_DIR, package_dir)):
    for fp in files:
      fd = open(os.path.join(root, fp))
      zf.writestr(
          template.apply_template(symbols, os.path.join(root, fp)),
          template.apply_template(symbols, fd.read()))
      fd.close()

  zf.close()
  mem_file.seek(0)

  return mem_file
