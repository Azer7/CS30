import sys, pygame
import matplotlib.pyplot as plt
import numpy as np
import wave
import os
import scipy.io.wavfile

#http://myinspirationinformation.com/uncategorized/audio-signals-in-python/

pygame.init()

size = width, height = 640, 480
speed = [2, 2]
black = 255, 255, 255

dir = os.path.abspath("ShootingStars.wav")
print(dir)
#s = pygame.mixer.Sound(r"C:\Users\Null\Documents\GitHub\CS30\Python 3D Library\ShootingStars.wav")
s = pygame.mixer.Sound(r"F:\Github\CS30\Python 3D Library\ShootingStars.wav")
s.play()
s.set_volume(0.1);
#rate,audData=scipy.io.wavfile.read(r"C:\Users\Null\Documents\GitHub\CS30\Python 3D Library\ShootingStars.wav")
rate,audData=scipy.io.wavfile.read(r"F:\Github\CS30\Python 3D Library\ShootingStars.wav")
#spf = wave.open(r"C:\Users\Null\Documents\GitHub\CS30\Python 3D Library\ShootingStars.wav","r")
print(rate)
print(audData)

channel1 = audData[0]


#create a time variable in seconds
time = np.arange(0, float(audData.shape[0]), 1) / rate

#plot amplitude (or loudness) over time
plt.figure(1)
plt.subplot(211)
plt.plot(time, channel1, linewidth=0.01, alpha=0.7, color='#ff7f00')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.show()
#screen = pygame.display.set_mode(size)

print("got raw data")



##ball = pygame.image.load("ball.jpg")
##ballrect = ball.get_rect()
##while 1:
##    for event in pygame.event.get():
##        if event.type == pygame.QUIT: sys.exit()
##
##    ballrect = ballrect.move(speed)
##    if ballrect.left < 0 or ballrect.right > width + 100:
##        speed[0] = -speed[0]
##    if ballrect.top < 0 or ballrect.bottom > height + 100:
##        speed[1] = -speed[1]
##
##    screen.fill(black)
##    screen.blit(ball, ballrect)
##    pygame.display.flip()
##
