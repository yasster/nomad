#!/usr/bin/python3
# -*- coding: utf-8 -*-

import serial.tools.list_ports
import re
import io
import os
import sys
import datetime
from time import sleep
import logging
from arduino import Arduino

DEBUG = 1 # True
ARDUINO = None
STOP_CMD = "0" + "\n"

ROOT_LOGGER = logging.getLogger("nomad")
ROOT_LOGGER.setLevel(level=logging.INFO)
LOG_HANDLER = logging.StreamHandler()
LOG_FORMATTER = logging.Formatter(
    fmt='%(asctime)s [%(name)s](%(levelname)s) %(message)s',
    datefmt='%H:%M:%S')
LOG_HANDLER.setFormatter(LOG_FORMATTER)
ROOT_LOGGER.addHandler(LOG_HANDLER)

PY_LOGGER = logging.getLogger("nomad.rpi")
MCU_LOGGER = logging.getLogger("nomad.arduino")

def forward():
    global ARDUINO
    cmd = "1" + "\n"
    ARDUINO.clear_buffer()

    if DEBUG:
        PY_LOGGER.info("Sending {}".format(cmd))
    
    # Send command
    ARDUINO.send_str_data(cmd)
    sleep(1)
    ARDUINO.send_str_data(STOP_CMD)

def back():
    global ARDUINO
    cmd = "2" + "\n"
    ARDUINO.clear_buffer()

    if DEBUG:
        PY_LOGGER.info("Sending {}".format(cmd))
    
    # Send command
    ARDUINO.send_str_data(cmd)
    sleep(1)
    ARDUINO.send_str_data(STOP_CMD)

def right():
    global ARDUINO
    cmd = "3" + "\n"
    ARDUINO.clear_buffer()

    if DEBUG:
        PY_LOGGER.info("Sending {}".format(cmd))
    
    # Send command
    ARDUINO.send_str_data(cmd)
    sleep(1)
    ARDUINO.send_str_data(STOP_CMD)

def left():
    global ARDUINO
    cmd = "4" + "\n"
    ARDUINO.clear_buffer()

    if DEBUG:
        PY_LOGGER.info("Sending {}".format(cmd))
    
    # Send command
    ARDUINO.send_str_data(cmd)
    sleep(1)
    ARDUINO.send_str_data(STOP_CMD)

def sensor():
    global ARDUINO
    cmd = "5" + "\n"
    ARDUINO.clear_buffer()

    if DEBUG:
        PY_LOGGER.info("Sending {}".format(cmd))
    
    # Send command
    ARDUINO.send_str_data(cmd)
    
    # print_info()
    msg = ""
    while True:
        m = ARDUINO.read_str_data()
        if m == '>':
            break
        else:
            msg += m

    # sensor data
    s1, s2, s3 = int(msg[2:5]), int(msg[5:8]), int(msg[8:11])
    PY_LOGGER.info("Sensor Data: {}, {}, {}".format(s1,s2,s3))
    return s1, s2, s3

def battery():
    global ARDUINO
    cmd = "6" + "\n"
    ARDUINO.clear_buffer()

    if DEBUG:
        PY_LOGGER.info("Sending {}".format(cmd))
    
    # Send command
    ARDUINO.send_str_data(cmd)

    # print_info()
    msg = ""
    while True:
        m = ARDUINO.read_str_data()
        if m == '>':
            break
        else:
            msg += m
    battery_level = int(msg[2:])
    PY_LOGGER.info("Battery Level: {}".format(battery_level))
    return battery_level

def print_info():
    global ARDUINO
    while True:
        msg = ARDUINO.read_str_data()
        if msg == '>':
            break
        else:
            MCU_LOGGER.info(msg)

def init():
    global ARDUINO
    # Get likely arduino connection
    seq = re.compile(r'/dev/ttyACM[0-9]')
    ports = list(serial.tools.list_ports.comports())
    if ports == []:
        PY_LOGGER.warning("No ports found")
        return False # exit if no connection
    for portString in ports:
        # If uno is found in string
        if 'ACM' in str(portString):
            # Find out com port and connect
            port = seq.match(str(portString)).group()
            ARDUINO = Arduino("nomad", port)
            PY_LOGGER.info("Connected to Arduino")
            print_info()
            return True
    PY_LOGGER.info("No Arduino found!")
    return False

if __name__ == "__main__":
    init()
    sys.exit(0)
