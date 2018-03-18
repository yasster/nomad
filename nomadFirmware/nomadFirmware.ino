// Nomad Demo program
// License can be found in LICENSE
// @since 17-MAR-2018

#include <IRremote.h> // infrared Library

// Debugging on
#define VERBOSE

#define MAX_BUF     (64) // max buffer size

// Right wheels
#define ENR         (5) // right enable
#define RFD         (6) // right forward
#define RBD         (7) // right backward

// Left Wheels
#define ENL         (11)  //left enable
#define LBD         (8) // left backward
#define LFD         (9) // left forward

// Robot Parameters
#define MSD         (0xff) // max speed
#define ACC         (0x05) // acceleration

// Bottom IR sensors
#define LTL         analogRead(10) // left sensor
#define LTM         analogRead(4) // middle sensor
#define LTR         analogRead(2) // right sensor

// IR control
#define FWD 16736925
#define BWD 16754775
#define RGT 16761405
#define LFT 16720605
#define SNS 16738455
#define BAT 16756815

// Variables
byte motion = 0;                // current motion
byte SOFAR = 0;                 // how much is in the buffer
byte LINE_COMPLETE = 0;         // whether the input line is complete
char serial_buffer[MAX_BUF];    // where we store the message
const long InternalReferenceVoltage = 1062; // Adjust this value to your board's specific internal BG voltage

int receiverpin = 12;           // Infrared signal receiving pin
int LED = 13;                   // define LED pin
volatile int state = LOW;       // define default input mode
unsigned long RED;

IRrecv irrecv(receiverpin);     // initialization
decode_results results;         // define structure type

void setup() {
    // Set right motor pins as output pins
    pinMode(RFD, OUTPUT);
    pinMode(RBD, OUTPUT);
    pinMode(ENR, OUTPUT);
    // Set left  motor pins as output pins
    pinMode(LBD, OUTPUT);
    pinMode(LFD, OUTPUT);
    pinMode(ENL, OUTPUT);
    // initialize LED as an output
    pinMode(LED, OUTPUT);
    // start receiving
    irrecv.enableIRIn();

    // Start serial ----------------------
    Serial.begin(9600);
    Serial.println("NOMAD v0.0.1");

    // Disbale all motors 
    _disengageMotors();

    serialReady();
}

void loop() {
    // Depends of serialEvent to update LINE_COMPLETE
    if (LINE_COMPLETE) {
        decodeMessage();
        // Get ready to receive more
        serialReady();
    }

    if (irrecv.decode(&results)) { 
        RED = results.value;
        irrecv.resume(); // receive the next value
        delay(150);
        decodeIR(RED);
    }
}
