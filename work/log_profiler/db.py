from mysql import connector as sql

db = sql.connect(
    host="146.148.103.208",
    user="jarrod",
    passwd="y2=z2X9^PvzRSM7P",
    database="altairix"
)
cursor = db.cursor()
