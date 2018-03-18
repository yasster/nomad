import pyrebase

config = {
    "apiKey": "AIzaSyDKstoSby1YdpTfy7xqAiDPt5Ta50PoOIw",
    "authDomain": "nomad-e1934.firebaseapp.com",
    "databaseURL": "https://nomad-e1934.firebaseio.com",
    "projectId": "nomad-e1934",
    "storageBucket": "nomad-e1934.appspot.com",
}

firebase = pyrebase.initialize_app(config)

# Database Variable
db = firebase.database()

currentState = ''

def getState():
    state  = db.child("PiMove").get()
    currentState = state

def stream_handler(message):
    print(message["event"])
    print(message["path"]) 
    print(message["data"])


my_stream = db.child("PiMove").child("Movement").stream(stream_handler)