import pyrebase
import sys

sys.path.append('../')
sys.path.append('../../')
sys.path.append('../nomadRPi/nomad')
from nomadRPi.nomad import rover

config = {
    "apiKey": "AIzaSyDKstoSby1YdpTfy7xqAiDPt5Ta50PoOIw",
    "authDomain": "nomad-e1934.firebaseapp.com",
    "databaseURL": "https://nomad-e1934.firebaseio.com",
    "projectId": "nomad-e1934",
    "storageBucket": "nomad-e1934.appspot.com",
}

def getState():
    state  = db.child("PiMove").get()
    currentState = state

def stream_handler(message):
    # print(message["event"])
    # print(message["path"])
    print(message["data"])
    for x in message["data"]:
        if message["data"][x]:
            if x == "up":
                # move rover up
                rover.forward()
            else if x == "down":
                # move rover down
                rover.back()
            else if x == "right":
                # move rover right
                rover.right()
            else if x == "left":
                # move rover left
                rover.left()

def main():
    firebase = pyrebase.initialize_app(config)

    # Database Variable
    db = firebase.database()

    currentState = ""

    # initialize rover
    if not rover.init():
        print("Failed to connect to NOMAD Rover.")
        exit(1)

    my_stream = db.child("PiMove").child("Movement").stream(stream_handler)

if __name__ == "__main__":
    main()
