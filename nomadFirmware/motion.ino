// Motion functions
// @since 17-MAR-2018

// Stops robot
// Motion 0
void _mStop() {
    #ifdef VERBOSE
    Serial.println("Stopping ...");
    #endif

    // Disable
    _disengageMotors();
    motion = 0;

    #ifdef VERBOSE
    Serial.println(motion);
    #endif
    return;
}

// Move robot forward
// Motion 1
void _mForward() {
    #ifdef VERBOSE
    Serial.println("Moving forward ...");
    #endif

    // Set forward pins to HIGH
    digitalWrite(RFD, HIGH);
    digitalWrite(LFD, HIGH);
    // Set backward pins to LOW
    digitalWrite(RBD, LOW);
    digitalWrite(LBD, LOW); 
    // Accelerate fwd
    _accelerate();
    // set motion variable
    motion = 1;

    #ifdef VERBOSE
    Serial.println(motion);
    #endif
    return;
}

// Move robot Backwards
// Motion 2
void _mBackward() {
    #ifdef VERBOSE
    Serial.println("Moving Backwards ...");
    #endif

    // Set forward pins to LOW
    digitalWrite(RFD, LOW);
    digitalWrite(LFD, LOW);
    // Set backward pins to HIGH
    digitalWrite(RBD, HIGH);
    digitalWrite(LBD, HIGH); 
    // Accelerate bwd
    _accelerate();
    // set motion variable
    motion = 2;

    #ifdef VERBOSE
    Serial.println(motion);
    #endif
    return;
}

// Move robot right
// Motion 3
void _mRight() {
    #ifdef VERBOSE
    Serial.println("Moving right ...");
    #endif

    // Set right pins reverse
    digitalWrite(RFD, LOW);
    digitalWrite(RBD, HIGH);
    // Set left pins to forward
    digitalWrite(LFD, HIGH);
    digitalWrite(LBD, LOW);
    // Accelerate fwd
    _accelerateRight();
    // set motion variable
    motion = 3;

    #ifdef VERBOSE
    Serial.println(motion);
    #endif
    return;
}

// Move robot left
// Motion 4
void _mLeft() {
    #ifdef VERBOSE
    Serial.println("Moving left ...");
    #endif

    // Set right pins forward
    digitalWrite(RFD, HIGH);
    digitalWrite(RBD, LOW);
    // Set left pins to reverse
    digitalWrite(LFD, LOW);
    digitalWrite(LBD, HIGH);
    // Accelerate bwd
    _accelerateLeft();
    // set motion variable
    motion = 4;

    #ifdef VERBOSE
    Serial.println(motion);
    #endif
    return;
}

// Slowly increase enable pin values
void _accelerate() {
    #ifdef VERBOSE
    Serial.println("Accelerating ...");
    #endif

    for (byte val=0x00; val<=MSD; val+=ACC) { // Control motor speed
        analogWrite(ENR, val);
        analogWrite(ENL, val);
        delay(30);      
    }
    return;
}
// Slowly increase enable pin values
void _accelerateLeft() {
    #ifdef VERBOSE
    Serial.println("Accelerating ...");
    #endif

    for (byte val=0x00; val<=MSD; val+=ACC) { // Control motor speed
        analogWrite(ENR, val);
        delay(30);      
    }
    return;
}
void _accelerateRight() {
    #ifdef VERBOSE
    Serial.println("Accelerating ...");
    #endif

    for (byte val=0x00; val<=MSD; val+=ACC) { // Control motor speed
        analogWrite(ENL, val);
        delay(30);      
    }
    return;
}

// Slowly reduce enable pin values
void _decelerate() {
    #ifdef VERBOSE
    Serial.println("Decelerating ...");
    #endif

    for (byte val=MSD; val>ACC; val-=ACC) {
        analogWrite(ENR, val);
        analogWrite(ENL, val);
        delay(30);      
    }
    return;
}

// Disengages the motors enable pins
void _disengageMotors() {
    #ifdef VERBOSE
    Serial.println("Disengaing motors ...");
    #endif

    // Set all motor pins to low
    digitalWrite(RFD, LOW); // disable right fwd pins
    digitalWrite(RBD, LOW); // disable right bwd pins
    digitalWrite(ENR, LOW); // disable right motors
    digitalWrite(LFD, LOW); // disable left fwd pins
    digitalWrite(LBD, LOW); // disable left bwd pins
    digitalWrite(ENL, LOW); // disable left motors

    return;
}
