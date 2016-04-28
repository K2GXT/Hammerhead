import RPi.GPIO as gpio

gpio.setmode(gpio.BOARD)

pins = [3,5,7,11,13,15,33,35,37,22,24,26,32,36,38,40]

for n in pins:
	gpio.setup(n, gpio.IN)

order = []

while len(order) != len(pins):
	if len(order) == 15:
		for n in pins:
			if n not in order:
				pass
	for n in pins:
		if not gpio.input(n):
			if n not in order:
				order.append(n)

currentDegInput = float(input("Stop input, type in degrees: "))

currentDeg = 0
currentDegIndex = 0
for n in pins:
	if not gpio.input(n):
		currentDeg = n
		currentDegIndex = order.index(n)

countBack = 0
while currentDegInput > 0:
	currentDegInput -= 22.5
	countBack += 1


size = len(order)

indexZero = 0

if countBack > currentDegIndex - 1:
	indexZero = size - (countBack - currentDegIndex) - 1
else:
	indexZero = currentDegIndex - countBack - 1


sorted = []
cur = indexZero

while len(sorted) != len(order):
	sorted.append(order[cur])
	cur += 1
	if cur == len(order):
		cur = 0


text_file = open("pins.txt", "w")
for n in sorted:
	text_file.write("%s\n" % n)
text_file.close()
