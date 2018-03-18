import pyrebase
import sys

sys.path.append('../')
sys.path.append('../../')
sys.path.append('../nomadRPi/nomad')
from nomadRPi.nomad import rover

DB = None

config = {
    "apiKey": "AIzaSyDKstoSby1YdpTfy7xqAiDPt5Ta50PoOIw",
    "authDomain": "nomad-e1934.firebaseapp.com",
    "databaseURL": "https://nomad-e1934.firebaseio.com",
    "projectId": "nomad-e1934",
    "storageBucket": "nomad-e1934.appspot.com",
}

def getState():
    global DB
    state  = DB.child("PiMove").get()
    currentState = state

def stream_handler(message):
    global DB
    sens1, sens2, sens3 = rover.sensor()
    batt_lvl = rover.battery()
    data = {"Sensor1":sens1, "Sensor2":sens2, "Sensor3":sens3, "Battery":batt_lvl}
    DB.child("PiMove").child("Sensors").set(data)
    print(message["data"])
    for x in message["data"]:
        if message["data"][x]:
            if x == "up":
                # move rover up
                rover.forward()
            elif x == "down":
                # move rover down
                rover.back()
            elif x == "right":
                # move rover right
                rover.right()
            elif x == "left":
                # move rover left
                rover.left()


def main():
    global DB
    firebase = pyrebase.initialize_app(config)

    # Database Variable
    DB = firebase.database()

    currentState = ""

    # initialize rover
    if not rover.init():
        print("Failed to connect to NOMAD Rover.")
        exit(1)

    my_stream = DB.child("PiMove").child("Movement").stream(stream_handler)

if __name__ == "__main__":
    main()
