// Communications
// @since 17-MAR-2018

void serialEvent() {
    while (Serial.available()) {
        // get the new byte:
        char inChar = (char)Serial.read();

        #ifdef VERBOSE
        Serial.print(inChar);  // repeat it back so I know you got the message
        #endif

        // add it to the serial_buffer if space is available
        if (SOFAR < MAX_BUF-1) {
            serial_buffer[SOFAR++] = inChar;
        }

        // if the incoming character is a newline, set a FLAG so the main loop can
        // do something about it
        if (inChar == '\n') {
            serial_buffer[SOFAR] = 0;  // end the buffer so string functions work right
            LINE_COMPLETE = 1;
        }
    }
}

void serialReady() {
    SOFAR = 0;
    LINE_COMPLETE = 0;
    Serial.println(F(">"));
}

float parseBuffer() {
    char *ptr = serial_buffer;  // start at the beginning of buffer
    return atof(ptr);  // convert the digits that follow into a float
}

void decodeMessage() {
    int cmd = (int)parseBuffer();
    Serial.println(cmd);
    
    switch (cmd) {
        case 1:
            _mForward();
            break;
        case 2:
            _mBackward();
            break;
        case 3:
            _mRight();
            break;
        case 4:
            _mLeft();
            break;
        case 5:
            _getSensorValues();
            break;
        case 6:
            getBandgap();
            break;
        default:
            _mStop();
            break;
    }
}

void decodeIR(long cmd) {
    switch (cmd) {
        case FWD:
            _mForward();
            break;
        case BWD:
            _mBackward();
            break;
        case RGT:
            _mRight();
            break;
        case LFT:
            _mLeft();
            break;
        case SNS:
            _getSensorValues();
            break;
        case BAT:
            getBandgap();
            break;
        default:
            _mStop();
            break;
    }
}
