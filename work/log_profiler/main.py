from xml.etree import ElementTree as ET
from db import cursor
import csv
import gzip


def parse_stack_trace(st_xml):
  try:
    tree = ET.fromstring(st_xml).find("trace")
  except Exception as e:
    print(f"Unable to parse stack trace({st_xml}): {e}")
    return st_xml

  if tree is None:
    return st_xml

  return "\n".join([
      f"{child.find('class').text}."
      f"{child.find('method').text}:"
      f"{child.find('line').text}"
      for child in tree])


def parse_data_doc(data_doc):
  if len(data_doc) == 0:
    return ""

  try:
    data_xml = gzip.decompress(data_doc).decode("iso-8859-1")
  except Exception as e:
    print(f"Data doc unzip error({e})")
    return ""

  tree = ET.fromstring(data_xml).find("objectArr")
  if tree is None:
    return ""

  return "\n".join([
      f"({child.find('type').text}) {child.find('name').text}: "
      f"{child.find('toString').text}" for child in tree])


# Get relevant columns on errors
cursor.execute(
    "SELECT LOG_UID, LOG_LEVEL, LOG_TSTP, "
    "TASK_UID, LOG_SYS_ID, LOG_USER, METHOD_NM, MESSAGE_TX, "
    "STACK_TRACE_DOC, LOG_DATA_DOC from altairix.ixalogh "
    "WHERE LOG_LEVEL = 'E'")
rs = cursor.fetchall()

stats_csv = csv.writer(open("stats.csv", "w+"))
stats_csv.writerow(["Method Name", "Count"])
data_csv = csv.writer(open("data.csv", "w+"))
data_csv.writerow([
    "Log Uid", "Level", "Timestamp", "Task Uid", "System Id",
    "User Id", "Method Name", "Text", "Stack Trace", "Data"])

counts = {}
for row in rs:
  method_name = row[-4]
  stack_trace_doc = row[-2]
  log_data_doc = row[-1]

  out_row = list(row[:-2])
  out_row.append(parse_stack_trace(stack_trace_doc))
  out_row.append(parse_data_doc(log_data_doc))

  data_csv.writerow(out_row)

  if method_name in counts.keys():
    counts[method_name] = counts[method_name] + 1
  else:
    counts[method_name] = 1

for method_name, count in counts.items():
  stats_csv.writerow([method_name, count])
