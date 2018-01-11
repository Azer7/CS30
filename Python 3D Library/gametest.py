import sys, pygame
import matplotlib.pyplot as plt
import numpy as np
import wave
import os
import playsound

pygame.init()
dir = os.path.abspath("ShootingStars.wav")
print(dir)
s = pygame.mixer.Sound(r"C:\Users\school\Documents\GitHub\CS30\Python 3D Library\ShootingStars.wav")
spf = wave.open(r'C:\Users\school\Documents\GitHub\CS30\Python 3D Library\ShootingStars.wav','r')

#Extract Raw Audio from Wav File
signal = spf.readframes(-1)
signal = np.fromstring(signal, 'Int16')


#If Stereo
if spf.getnchannels() == 2:
    #print 'Just mono files'
    sys.exit(0)

plt.figure(1)
plt.title('Signal Wave...')
plt.plot(signal)
plt.show()
