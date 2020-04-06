import asyncio
import websockets

ws_url = "wss://usapi4.xirsys.com:443/ws/v2/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhciI6eyJwcmkiOiJUaGF0QnJvY2tHdXkiLCJzZWMiOm51bGx9LCJkciI6eyJrIjoiam9obiIsImwiOiIqc3VicyIsInAiOiIvVGVzdCJ9LCJleHAiOjE1ODU1ODM3NTksInNlYyI6Ijc3ODY2OTNhLTZmYTMtMTFlYS1hZGI2LTAyNDJhYzExMDAwNCJ9.ermueI8fMPFTGGyFgXeuzmrfw783IBstlOqHKouNecw"


async def test():
  async with websockets.connect(ws_url) as ws:
    rsp = await ws.recv()
    print(rsp)

asyncio.get_event_loop().run_until_complete(test())
