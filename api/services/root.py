from core import api
from services.sub.api import Substitute, Case
# from services.gen import (
#     AdfPackage, BxPackage,
#     CreatePackageData, LoadCommand, Tcd, TcdField)
from services.fmt.api import Table, Pivot
# from services.templater import (
#     CreateTemplate_Basic, ApplyTemplate_Basic)
# from services.builder import Generate


def init_services():
  # Generator
  # api.add_resource(AdfPackage, "/gen/adf-package")
  # api.add_resource(BxPackage, "/gen/bx-package")
  # api.add_resource(CreatePackageData, "/gen/package-data")
  # api.add_resource(LoadCommand, "/gen/load-command")
  # api.add_resource(Tcd, "/gen/tcd")
  # api.add_resource(TcdField, "/gen/tcd-field")

  # Substitute
  api.add_resource(Substitute, "/sub/text")
  api.add_resource(Case, "/sub/case")

  # Formatter
  api.add_resource(Table, "/fmt/table")
  api.add_resource(Pivot, "/fmt/pivot")

  # Templater
  # api.add_resource(CreateTemplate_Basic, "/templater/create-basic")
  # api.add_resource(ApplyTemplate_Basic, "/templater/apply-basic")

  # Builder
  # api.add_resource(Generate, "/builder/generate")
