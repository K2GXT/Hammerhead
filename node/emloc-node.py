#!/usr/bin/python
import requests
import RPi.GPIO as gpio
import sys
from rtl_fm_python_thread import *

make_rtl_fm_thread(block=False)

gpio.setmode(gpio.BOARD)

serverURL = "http://kc2tnr.student.rit.edu:5000/"

settings = []
f = open(sys.argv[1], 'r')
for line in f:
    settings.append(line.strip())

r = requests.post(serverURL + "register", data={"request":"REGISTER", "name":settings[0],"lat":float(settings[1]),"lon":float(settings[2])})

uid = ""
if r.status_code == requests.codes.ok:
    uid = r.text
else:
    exit()

f = open("pins.txt", 'r')

pins = []
for line in f:
    pins.append(int(line))

for n in pins:
    gpio.setup(n, gpio.IN)

freq = "89.7M"
gain = 144
mode = "FM"
currentHeading = 0

def update():
    #mmmm global variables
    global freq
    global gain
    global mode
    r = requests.get(serverURL + 'ping')
    json = r.json()
    if str(json['freq']) + "M" != freq:
        freq = str(json['freq']) + "M"
        set_freq_human(freq)
    if json['gain'] != gain:
        gain = json['gain']
        set_gain(gain)
    if json['mode'] != mode:
        mode = json['mode']
        set_demod(mode)

def getHeading():
   heading = 0
   for n in pins:
       if not gpio.input(n):
           return heading
       else:
           heading += 22.5

def sendHeading():
    global settings
    r = requests.post(serverURL + 'heading', data={'heading':currentHeading, 'name':settings[0]})

while True:
    update()
    newHeading = getHeading()
    if currentHeading != newHeading:
        currentHeading = newHeading
        sendHeading()
    sleep(1)

stop_thread()
