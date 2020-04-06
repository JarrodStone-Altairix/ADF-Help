from base64 import b64encode
import json
import requests
import asyncio
import websockets
import time

host_url = "https://global.xirsys.net"
btoa = b64encode(
    "ThatBrockGuy:7786693a-6fa3-11ea-adb6-0242ac110004".encode("utf-8"))
header = {"Authorization": "Basic " + btoa.decode("utf-8")}
user = "patrick"
pkt = {
    "t": "u",
    "m": {
        "f": "Test/patrick",
        "o": "Hello world!"
    },
    "p": {"msg": "d"}
}

rsp = requests.put(
    host_url + "/_token/Test",
    params={"k": user, "expire": 30},
    headers=header
)
print("Signal token: " + rsp.text)
signal_token = rsp.json()["v"]

rsp = requests.get(
    host_url + "/_host",
    params={"type": "signal", "k": user},
    headers=header
)
print("Best host: " + rsp.text)
webrtc_host = rsp.json()["v"] + "/v2/" + signal_token

rsp = requests.put(
    host_url + "/_turn/Test",
    json={"format": "urls"},
    headers=header
)
print("ICE URLs: " + rsp.text)


async def test():
  async with websockets.connect(webrtc_host) as ws:
    while True:
      rsp = await ws.recv()
      time.ge
      print(rsp)

print(json.dumps(pkt))
asyncio.get_event_loop().run_until_complete(test())
