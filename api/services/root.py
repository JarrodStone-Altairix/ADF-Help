from core import api
from services.sub.api import Substitute, Case
from services.gen.api import ListTemplate, ReadTemplate

#     AdfPackage, BxPackage,
#     CreatePackageData, LoadCommand, Tcd, TcdField)
from services.fmt.api import Table, Pivot
import services.template.api as template
import services.builder.api as builder


def init_services():
  # Generator
  api.add_resource(ListTemplate, "/gen/template/list")
  api.add_resource(ReadTemplate, "/gen/template/read")
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
  api.add_resource(template.Create, "/template/create")
  api.add_resource(template.Apply, "/template/apply")

  # Builder
  api.add_resource(builder.Package, "/builder/package")
