#!/usr/bin/python3
# -*- coding: utf-8 -*-

import io
import serial

class Arduino(object):
    def __init__(self, ability, port):
        self.name = ability
        self.conn = serial.Serial(port, 9600)

    def send_str_data(self, string):
        """ Send character string """
        self.conn.write(string.encode('utf-8'))

    def read_str_data(self):
        """ read string """
        data = self.conn.readline()
        return data.decode().rstrip()

    def read_num_data(self):
        """ Reads in numerical data from uno """
        data = self.conn.readline()
        return ord(data.decode().rstrip())

    def clear_buffer(self):
        """ Flush serial buffer """
        self.conn.flush()

    def __del__(self):
        self.conn.close()
