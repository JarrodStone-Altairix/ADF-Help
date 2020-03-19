import re


def format_table(text, delim=','):

  # Create a row major ordered array
  table = [
      line.split(delim)
      for line in text.split("\n")
      if len(line.strip()) > 0]

  # Clear out whitespace of all lines except for the first column
  table = [
      [ele.strip() if i > 0 else ele for i, ele in enumerate(line)]
      for line in table]

  # fill in any empty spaces
  max_cols = len(max(table, key=len))
  for line in table:
    cols = max_cols - len(line)
    line.extend([None] * cols)

  # convert to column major order
  table_t = list(map(list, zip(*table)))

  # format the new table, the first column should not be formatted
  fmt_table = []
  for j, col in enumerate(table_t[1:]):

    # get the length of the longest line of the previous column
    max_len = 0
    for prev_ele, ele in zip(table_t[j], col):
      ele_len = len(prev_ele)
      if ele is not None and ele_len > max_len:
        max_len = ele_len

    # Add whitespace as needed for each column
    fmt_col = []
    for i, ele in enumerate(col):

      if ele is not None:
        fmt_col.append(
            (' ' * (max_len - len(table[i][j]) + 1)) + ele)
      # Some columns may be empty, propagate forward
      else:
        fmt_col.append(None)
    fmt_table.append(fmt_col)
  # Add back the first column
  fmt_table.insert(0, table_t[0])

  return "\n".join([
      # rebuild table
      delim.join(filter(lambda e: e is not None, row))
      # Transpose back to row major order
      for row in list(map(list, zip(*fmt_table)))])


def format_pivot(text, pivot):

  # Split into prefixes, pivot/delim and suffixes
  prefixes, delims, suffixes = list(map(list, zip(
      # regex split on the pivot
      *[re.split(f"({pivot})", line, 1)
        # get each line
        for line in text.split("\n")])))
  # Clear any whitespace in the prefixes
  prefixes = [p.rstrip() for p in prefixes]

  max_len = len(max(prefixes, key=len))
  return "\n".join([
      prefix + (" " * (max_len - len(prefix) + 1)) + delim + suffix
      for prefix, delim, suffix in zip(prefixes, delims, suffixes)])
