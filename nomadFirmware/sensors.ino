// On board Nomad sensors
// @since 17-MAR-2018

void _getSensorValues() {
    Serial.println(LTL);
    Serial.println(LTM);
    Serial.println(LTR);

    return;
}

// results are Vcc * 100
// So for example, 5V would be 500.
void getBandgap() {
    // REFS0 : Selects AVcc external reference
    // MUX3 MUX2 MUX1 : Selects 1.1V (VBG)
    ADMUX = bit (REFS0) | bit (MUX3) | bit (MUX2) | bit (MUX1);
    ADCSRA |= bit( ADSC );  // start conversion
    
    while (ADCSRA & bit (ADSC));  // wait for conversion to complete (toss this measurement)
    ADCSRA |= bit( ADSC );  // start conversion
    while (ADCSRA & bit (ADSC)); // wait for conversion to complete
    
    int results = (((InternalReferenceVoltage * 1024) / ADC) + 5) / 10;
    Serial.println(results);
    
    return;
} // end of getBandgap
